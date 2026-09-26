import { EventImageCreateDTO } from '../dto/eventImage.dto'

export class propsImage {
    id: string;
    imageURL: string;
    description: string;
    eventId: string
}

export class EventImage {
    constructor(private props: propsImage) {}

    public static construct({imageURL, description, eventId}: EventImageCreateDTO) {
        const props: propsImage = {
            id: crypto.randomUUID(),
            imageURL,
            description: description ?? '',
            eventId
        }
        return new EventImage(props);
    }

    public static reconstruct(props: propsImage) {
        return new EventImage(props);
    }

    public get id () {
        return this.props.id;
    }

    public get imageURL () {
        return this.props.imageURL;
    }

    public get description () {
        return this.props.description;
    }

    public get eventId () {
        return this.props.eventId;
    }
}