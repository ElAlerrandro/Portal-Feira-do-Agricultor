import { EventCreateDTO } from "../dto/event.dto";

export enum EventState {
    PENDING = 'PENDING',
    CANCELED = 'CANCELED',
    CONCLUDED = 'CONCLUDED',
    RESCHEDULED = 'RESCHEDULED',
    HAPPENING = 'HAPPENING'
}

export type propsEvent = {
    id: string;
    title: string;
    date: Date;
    description: string;
    startTime: string;
    endTime: string;
    location: string;
    latitude?: number;
    longitude?: number;
    state: EventState;
    image?: string;
    createdAt: Date;
    adminId: string;
}

export class Event {
    constructor(private props: propsEvent) {}

    public static construct({title, date, description, startTime, endTime, location, latitude, longitude, state, image, adminId}: EventCreateDTO) {
        const props: propsEvent = {
            id: crypto.randomUUID(),
            title,
            date,
            description,
            startTime,
            endTime,
            location,
            latitude,
            longitude,
            state: state as EventState,
            image,
            createdAt: new Date(),
            adminId
        }
    }

    public static reconstruct(props: propsEvent) {
        return new Event(props);
    }

    public get id () {
        return this.props.id;
    }

    public get title () {
        return this.props.title;
    }

    public get date () {
        return this.props.date;
    }

    public get description () {
        return this.props.description;
    }

    public get startTime () {
        return this.props.startTime;
    }

    public get endTime () {
        return this.props.endTime;
    }

    public get location () {
        return this.props.location;
    }

    public get latitude () {
        return this.props.latitude;
    }

    public get longitude () {
        return this.props.longitude;
    }

    public get state () {
        return this.props.state;
    }

    public get image () {
        return this.props.image;
    }

    public get createdAt () {
        return this.props.createdAt;
    }

    public get adminId () {
        return this.props.adminId;
    }
}