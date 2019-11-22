import React, {useState} from "react";
import 'antd/dist/antd.css'
import { getPeople } from "./api/people";
import PeopleTable from "./components/PeopleTable";

const App: React.FC = () => {
    const [people, setPeople] = useState(getPeople);
    return <PeopleTable people={people} />;
};

export default App;
