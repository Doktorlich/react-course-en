import { Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
    // внутри конструктора используется состояние, состояние всегда должно начинается со state,
    // данное слово зарезервировано.
    //  в компонентах основанных на классах состояние всегда должно быть объявлено как объект
    constructor() {
        super();
        this.state = {
            showUsers: true,
            moreState: "Test",
            // внутри обьекта можно объявлять свойства с ключами любого типа(возвращает частично гибкость данный внутри хука useState)
            nested: {},
            data: [],
        };
    }

    toggleUsersHandler() {
        // метод setState наследуюется от класса Component , метод setState должен принимать только объект,
        // таким обрахом осуществляется работа с состоянием, по типу хука useState
        // что важно использование данного метода не будет перезаписывать старый state  ,
        // в место этого react  под копотом, будет объединять объект который был передан с существующим state
        // логика перезаписи предыдущего state должна быть написана вручную
        this.setState(curState => {
            return { showUsers: !curState.showUsers };
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // try {
        //     someCodeWhichFail()
        // }catch (err){
        //     //handle error
        //
        // }
        if (this.props.users.length === 0) {
            throw new Error("No users provider");
        }
    }

    toggleUserHandler() {
        this.setState(curState => {
            return { showUsers: !curState.showUsers };
        });
    }

    render() {
        const usersList = (
            <ul>
                {this.props.users.map(user => (
                    <User key={user.id} name={user.name} />
                ))}
            </ul>
        );
        return (
            <div className={classes.users}>
                {/* для получения доступа к текущему состоянию используем this.state */}
                <button onClick={this.toggleUsersHandler.bind(this)}>{this.state.showUsers ? "Hide" : "Show"} Users</button>
                {this.state.showUsers && usersList}
            </div>
        );
    }
}

// const Users = () => {
//     const [showUsers, setShowUsers] = useState(true);
//
//     const toggleUsersHandler = () => {
//         setShowUsers(curState => !curState);
//     };
//
//     const usersList = (
//         <ul>
//             {DUMMY_USERS.map(user => (
//                 <User key={user.id} name={user.name} />
//             ))}
//         </ul>
//     );
//
//     return (
//         <div className={classes.users}>
//             <button onClick={toggleUsersHandler}>{showUsers ? "Hide" : "Show"} Users</button>
//             {showUsers && usersList}
//         </div>
//     );
// };

export default Users;
