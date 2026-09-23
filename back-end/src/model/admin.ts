import { AdminCreateDTO } from "../dto/admin.dto";
import { administratorRole } from "../enums/administrator-role.enum";

export type propsAdmin = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: administratorRole;
    active: boolean;
    createdAt: Date;
}

export class Admin {
    constructor(private props: propsAdmin) {}

    public static construct({name, email, password}: AdminCreateDTO) {
        const props: propsAdmin = {
            id: crypto.randomUUID(),
            name,
            email,
            password,
            role: administratorRole.Normal,
            active: true,
            createdAt: new Date()
        }
        return new Admin(props);
    }

    public static reconstruct(props: propsAdmin) {
        return new Admin(props);
    }

    public get id () {
        return this.props.id;
    }

    public get name () {
        return this.props.name;
    }

    public get email () {
        return this.props.email;
    }

    public get password () {
        return this.props.password;
    }

    public get role () {
        return this.props.role;
    }

    public get active () {
        return this.props.active;
    }

    public get createdAt () {
        return this.props.createdAt;
    }
}