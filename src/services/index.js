import calculator from 'services/calculator';

const services_ = {
    calculator
}

const services = {
    
    ...services_,

    initialize: () => {

        Object.keys(services_).map(key => {
            
            const service = services_[key]

            if (typeof service.initialize === "function") {
                service.initialize()
            }

            return null
        });
        
    }
    
}

export default services;