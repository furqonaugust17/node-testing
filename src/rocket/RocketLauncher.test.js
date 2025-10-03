const Rocket = require('./Rocket');
const RocketLauncher = require('./RocketLauncher');
const RocketRepairKit = require('./RocketRepairKit');


describe('A Rocket Launcher', () => {
    it('should launch all rockets', () => {
        const nasaRocket = new Rocket('Nasa');
        const spaceXRocket  = new Rocket('SpaceX');

        const rocketLauncher = new RocketLauncher({},[nasaRocket, spaceXRocket]);

        rocketLauncher.launchAllRockets();

        expect(nasaRocket.engineStatus).toEqual('active');
        expect(spaceXRocket.engineStatus).toEqual('active');
        expect(rocketLauncher.rockets.length).toEqual(0);
    });

    it('should launch only one rocket by queue',() =>{
        const nasaRocket = new Rocket('Nasa');
        const spaceXRocket = new Rocket('SpaceX');

        const rocketLauncher = new RocketLauncher({}, [nasaRocket, spaceXRocket]);

        rocketLauncher.launchRocketByQueue();

        expect(nasaRocket.engineStatus).toEqual('active');
        expect(spaceXRocket.engineStatus).toEqual('inactive');
        expect(rocketLauncher.rockets.length).toEqual(1);
    });

    it('should return correct result when repair kit cannot repair the rocket', async() => {
        const failedRepairKit = {
            repair: () => Promise.reject('failed to repair the rocket'),
        };

        const rocketLauncher = new RocketLauncher(failedRepairKit, [{}]);

        const result = await rocketLauncher.repairAllRockets();

        expect(result).toEqual('there was 1 of 1 rocket fail to repair!')
    });

    it('should repair some repairable rocket when repair kit cannot repair some the rocket', async() => {
        const repairableRocket = new Rocket('repairableRocket');
        const unrepairableRocket = new Rocket('unrepairableRocket');

        const fakeRocketRepairKit = {
            repair: jest.fn().mockImplementation((rocket) => {
                if(rocket.name === 'repairableRocket'){
                    return Promise.resolve();
                }

                return Promise.reject('failed to repair the rocket');
            }),
        };

        const rocketLauncher = new RocketLauncher(fakeRocketRepairKit, [repairableRocket, unrepairableRocket]);

        const result = await rocketLauncher.repairAllRockets();

        expect(result).toEqual('there was 1 of 2 rocket fail to repair!');

        expect(fakeRocketRepairKit.repair).toHaveBeenCalled();
        expect(fakeRocketRepairKit.repair).toHaveBeenCalledWith(repairableRocket);
    });

    it('should repair all the rockets with repair kit correctly', async ()  => {
        const nasaRocket = new Rocket('nasa');
        const spaceXRocket = new Rocket('spaceX');

        const rocketRepairKit = new RocketRepairKit({}, {}, {});

        const spyRepairKit = jest.spyOn(rocketRepairKit, 'repair');
        const rocketLauncher = new RocketLauncher(rocketRepairKit,[nasaRocket, spaceXRocket]);

        const result = await rocketLauncher.repairAllRockets();

        expect(spyRepairKit).toHaveBeenCalledTimes(2);
        expect(spyRepairKit).toHaveBeenCalledWith(nasaRocket);
        expect(spyRepairKit).toHaveBeenCalledWith(spaceXRocket);
        expect(result).toEqual('all rocket repaired!');
    });
});