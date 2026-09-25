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
    startAt: string;
    endAt: string;
    localAddress: string;
    latitude?: number;
    longitude?: number;
    state: EventState;
    bannerImage?: string;
    createdAt: Date;
    adminId: string;
}

export class Event {
    constructor(private props: propsEvent) {}

    public static construct(dto: EventCreateDTO, adminId: string) {
        const props: propsEvent = {
            id: crypto.randomUUID(),
            title: dto.title,
            date: dto.date,
            description: dto.description,
            startAt: dto.startAt,
            endAt: dto.endAt,
            localAddress: dto.localAddress,
            latitude: dto.latitude,
            longitude: dto.longitude,
            state: EventState.PENDING,
            bannerImage: dto.bannerImage,
            createdAt: new Date(),
            adminId
        }
        return new Event(props)
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

    public get startAt () {
        return this.props.startAt;
    }

    public get endAt () {
        return this.props.endAt;
    }

    public get localAddress () {
        return this.props.localAddress;
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

    public get bannerImage () {
        return this.props.bannerImage;
    }

    public get createdAt () {
        return this.props.createdAt;
    }

    public get adminId () {
        return this.props.adminId;
    }
}