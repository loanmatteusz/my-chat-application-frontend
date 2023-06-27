interface Authentication {
    password: string;
    salt: string;
    sessionToken: string;
}

export interface UserInterface {
    _id: string;
    username: string;
    email: string;
    authentication?: Authentication;
    createdAt: Date;
    updatedAt: Date;
}
