
class MediaPlayer {
    private currentTrack: string | null = null;
    play(track: string) {
        this.currentTrack = track;
        console.log(`Playing ${track}`);
    }

    continueWithCurrentTrack() {
        console.log(`Playing ${this.currentTrack}`);
    }

    hasTrackFinished() {
        return this.currentTrack === null;
    }

}

class StarDJ {
    private songService: SongService;
    private mediaPlayer: MediaPlayer;

    constructor(songService: SongService, mediaPlayer: MediaPlayer) {
        this.songService = songService;
        this.mediaPlayer = mediaPlayer;
    }

    locationChangedTo(location: string) {
        let track = this.songService.getSong(location);
        if (track) {
            if (this.mediaPlayer.hasTrackFinished()) {
                this.mediaPlayer.play(track);
            } else {
                this.mediaPlayer.continueWithCurrentTrack();
            }
        }
        else {
            this.mediaPlayer.continueWithCurrentTrack();
        }
    }
}

class SongService {
    constructor() {
    }

    getSong(location: string): string | null {
        return "";
    }
}


describe('StarDJTests', () => {
    it('on the location `Star Destroyer` play the track `Red Right Hand`', () => {
        // Arrange
        let songService: SongService = new SongService();
        let mediaPlayer: MediaPlayer = new MediaPlayer();
        let starDJ: StarDJ = new StarDJ(songService, mediaPlayer);

        // Mock the methods
        jest.spyOn(mediaPlayer, 'play');
        jest.spyOn(songService, 'getSong').mockReturnValue("Red Right Hand");

        // Act
        starDJ.locationChangedTo('Star Destroyer');

        // Assert
        expect(mediaPlayer.play).toHaveBeenCalledWith('Red Right Hand');
    });

    it('on the location `Tatooine` dont play any track', () => {
        // Arrange
        let songService: SongService = new SongService();
        let mediaPlayer: MediaPlayer = new MediaPlayer();
        let starDJ: StarDJ = new StarDJ(songService, mediaPlayer);

        // Mock the methods
        jest.spyOn(mediaPlayer, 'continueWithCurrentTrack');
        jest.spyOn(songService, 'getSong').mockReturnValue(null);

        // Act
        starDJ.locationChangedTo('Tatooine');

        // Assert
        expect(mediaPlayer.continueWithCurrentTrack).toHaveBeenCalled();
    });

    it('on the location change from `Star Destroyer` to `Tatooine` wait for the "Red Right Hand" to finish and then play "Enemy"', () => {
        // Arrange
        let songService: SongService = new SongService();
        let mediaPlayer: MediaPlayer = new MediaPlayer();
        let starDJ: StarDJ = new StarDJ(songService, mediaPlayer);

        // Mock the methods
        jest.spyOn(mediaPlayer, 'play');
        jest.spyOn(mediaPlayer, 'continueWithCurrentTrack');
        jest.spyOn(songService, 'getSong').mockReturnValueOnce("Red Right Hand").mockReturnValue("Enemy");
        jest.spyOn(mediaPlayer, 'hasTrackFinished').mockReturnValue(true);

        // Act
        starDJ.locationChangedTo('Star Destroyer');
        starDJ.locationChangedTo('Tatooine');

        // Assert
        expect(mediaPlayer.play).toHaveBeenNthCalledWith(1, "Red Right Hand");
        expect(mediaPlayer.hasTrackFinished).toHaveBeenCalled();
        expect(mediaPlayer.play).toHaveBeenNthCalledWith(2, "Enemy");
    });


});