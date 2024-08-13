export interface User {
    id?: string;  // El '?' indica que el campo es opcional
    username: string;
    password: string;  // Añade la propiedad 'password'
    role?: string;
}
