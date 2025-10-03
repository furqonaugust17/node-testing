class RocketLauncher{
    constructor(rockets = []){
        this.rockets = rockets;
    }

    launchAllRockets(){
        this.rockets.forEach((rocket) => {
            rocket.engineStatus = 'active';
        });

        this.rockets = [];
    }

    launchRocketByQueue(){
        const rocket = this.rockets.unshift();
        rocket.engineStatus = 'active';
    }
}

module.exports = RocketLauncher;