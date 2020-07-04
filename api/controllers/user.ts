import { IUser } from '../models/user.ts';

let users: Array<IUser> = [{
    id: "1",
    name: "Victor Huggo",
    email: "victorhuggo97@gmail.com",
    create_at: new Date("2020-05-13"),
    update_at: new Date("2020-05-13")
}];


const getUsers = ({ response }: { response: any }) => {
    response.body = users;
};

const getUser = ({ params, response }: { params: { id: string }; response: any },
) => {
    const user: IUser | undefined = users.find((user) => user.id === params.id);

    if (user) {
        response.status = 200;
        response.body = user;
    } else {
        response.status = 404;
        response.body = "User not found!"
    }
};

const addUser = async ({ request, response }: { request: any; response: any; }) => {
    const body = await request.body();
    const user: IUser = body.value;

    user.create_at = new Date();
    user.update_at = new Date();

    users.push(user);

    response.body = { message: "OK" };
    response.status = 200;


};

const updateUser = async ({ params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
},
) => {
    let user: IUser | undefined = users.find((user) => user.id === params.id);

    if (user) {
        const body = await request.body();
        const updateUser: { name?: string; email?: string; } = body.value;

        user = { ...user, ...updateUser, update_at: new Date() };
        users = [...users.filter((user) => user.id !== params.id), user];

        response.status = 200;
        response.body = { message: "OK" };
    } else {
        response.status = 404;
        response.body = { message: "User nor found!!!" };
    }
};

const deleteUser = ({ params, response }: { params: { id: string }; response: any },
) => {
    users = users.filter((user) => user.id !== params.id);

    response.body = { message: "OK" };
    response.status = 200;
}

export { getUsers, getUser, addUser, updateUser, deleteUser };

