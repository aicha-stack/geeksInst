

// Exercise 2:
import React, { useState, useEffect } from "react";

interface GreetingProps {
  name: string;
  messageCount: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You have {messageCount} new messages.</p>
    </div>
  );
};

export default Greeting;

// Exercise 3:
const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>("None");

  const increment = () => {
    setCount((prev) => prev + 1);
    setLastAction("Increment");
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
    setLastAction("Decrement");
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <p>Last Action: {lastAction}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;

// Exercise 4: 
interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name = "Anonymous",
  age = 0,
  role = "Guest",
}) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default UserCard;

// Exercise 5: 
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

// App.tsx - using all components
import React from "react";
import Greeting from "./Greeting";
import Counter from "./Counter";
import UserCard from "./UserCard";
import UserList from "./UserList";

const App: React.FC = () => {
  return (
    <div>
      <Greeting name="Aisha" messageCount={5} />
      <Counter />
      <UserCard name="Aisha" age={23} role="Admin" />
      <UserCard name="Samir" />
      <UserCard />
      <UserList />
    </div>
  );
};

export default App;
