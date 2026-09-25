import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { EventCreateDTO, EventUpdateDTO } from '../dto/event.dto';
import { EventService } from '../service/event.service';
import { AuthRequest } from '../../middleware'

export class EventController {
    public constructor(private eventService: EventService) {}

    public async create(req: AuthRequest, res: Response) {
        try {
            const dto = plainToInstance(EventCreateDTO, req.body)
            const errors = await validate(dto);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const adminId = req.admin?.adminId
            if (!adminId) {
                return res.status(401).json({ error: 'Authetication is required' })
            }

            await this.eventService.create(dto, adminId)
            return res.status(201).json({  message: 'Event creating successfully' })
        } catch (error: any) {
            return res.status(500).json({  error: 'Error creating event' })
        }
    }

    public async update(req: AuthRequest, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            const dto = plainToInstance(EventUpdateDTO, req.body)
            const errors = await validate(dto)
            if (errors.length > 0) {
                return res.status(400).json({ errors })
            }

            await this.eventService.update(id, dto)
            return res.status(201).json({  message: 'Event updated successfully' })
        } catch (error: any) {
            if (error.message.includes === 'Event not found') {
                return res.status(409).json({ error: 'Event not found' });
            }
            return res.status(500).json({ error: 'Error updating event' });
        }
    }

    public async delete(req: AuthRequest, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
            await this.eventService.delete(id)
            return res.status(200).json({ message: 'Event deleted successfully' })
        } catch (error: any) {
            if (error.message.includes === 'Event not found') {
                return res.status(409).json({ error: 'Event not found' });
            }
            return res.status(500).json({ error: 'Error deleting event' });
        }
    }
}