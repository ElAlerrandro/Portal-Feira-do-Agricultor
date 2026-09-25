import { EventDAO, EventUpdateData } from '../dao/event.dao';
import { EventCreateDTO, EventUpdateDTO } from '../dto/event.dto';
import { Event } from '../model/event'

export class EventService {
    public constructor(private eventDAO: EventDAO) {}

    public async create(dto: EventCreateDTO, adminId: string): Promise<void> {
        try {
            if (dto.startAt >= dto.endAt) {
                throw new Error('startAt must be before endAt');
            }

            const event = Event.construct(dto, adminId);
            await this.eventDAO.create(event)
        } catch (error: any) {
            throw new Error('Error creating Event: ' + error.message);
        }
    }

    public async update(id: string, dto: EventUpdateDTO): Promise<void> {
        const event = await this.eventDAO.searchById(id)
        if (!event) {
            throw new Error('Event not Found')
        }

        const startAt = dto.startAt ?? event.startAt;
        const endAt = dto.endAt ?? event.endAt;
        if (startAt >= endAt) {
            throw new Error('startAt must be before endAt')
        }

        const data: EventUpdateData = { ...dto};
        await this.eventDAO.update(id, data)
    }

    public async delete(id: string): Promise<void> {
        const event = await this.eventDAO.searchById(id)
        if (!event) {
            throw new Error('Event not found');
        }

        await this.eventDAO.delete(id)
    }

    public async searchById(id: string): Promise<Event | null> {
        return this.eventDAO.searchById(id);
    }
}