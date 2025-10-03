const Rocket = require('./Rocket');
const RocketLauncher = require('./RocketLauncher');


describe('A Rocket Launcher', () => {
    it('should launch all rockets', () => {
        const nasaRocket = new Rocket('Nasa');
        const spaceXRocket  = new Rocket('SpaceX');

        const rocketLauncher = new RocketLauncher([nasaRocket, spaceXRocket]);

        rocketLauncher.launchAllRockets();

        expect(nasaRocket.engineStatus).toEqual('active');
        expect(spaceXRocket.engineStatus).toEqual('active');
        expect(rocketLauncher.rockets.length).toEqual(0);
    });

    it('should launch only one rocket by queue',() =>{
        
    });
});