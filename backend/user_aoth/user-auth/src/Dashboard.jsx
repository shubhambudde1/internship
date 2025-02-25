const Dashboard = ({ user }) => {
    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Dashboard;
