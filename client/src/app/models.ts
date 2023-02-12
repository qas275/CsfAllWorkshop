export interface weather{
    
    name: string,
    id:number,
    description: string,
    temp:number
}

export class weather{
    constructor(
        public name:string,
        public id:number,
        public description: string,
        public temp:number
    ){

    }
}

export interface citiesTable{
    index: string,
    cities: string[]
}