import { AdminPage } from './components/AdminPage';

export const config = {
  endpoint: `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`,
};

function App() {

  return (
    <div className="">
      <AdminPage/>
    </div>
  );
}

export default App;
