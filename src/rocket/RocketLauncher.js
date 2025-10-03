class RocketLauncher{
    constructor(repairKit, rockets = []){
        this.repairKit = repairKit;
        this.rockets = rockets;
    }

    launchAllRockets(){
        this.rockets.forEach((rocket) => {
            rocket.engineStatus = 'active';
        });

        this.rockets = [];
    }

    launchRocketByQueue(){
        const rocket = this.rockets.shift();
        rocket.engineStatus = 'active';
    }

    async repairAllRockets(){
        let failedRepairRockets = 0;

        for(const rocket of this.rockets){
            try {
                await this.repairKit.repair(rocket);
            } catch (error) {
                failedRepairRockets++;
            }
        }

        if(!failedRepairRockets){
                return `all rocket repaired!`;
            }

            return `there was ${failedRepairRockets} of ${this.rockets.length} rocket fail to repair!`;
    }
}

module.exports = RocketLauncher;