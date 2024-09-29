import { Routes, Route } from "react-router-dom";
import SignIn from "./screens/sign-in/SignIn";
import Dashboard from "./screens/dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import Organizations from "./screens/organization/Organization";
import ExpensesTable from "./screens/expenses/Expenses";
import BulkUploadScreen from "./screens/uploads/BulkUpload";
import CategoriesScreen from "./screens/categories/Categories";
import Policies from "./screens/policies/Policies";
import TeamAndMembers from "./screens/users/Users";
import Analytics from "./screens/analytics/Analytics";
import Approvals from "./screens/approvals/Approvals";
import Branches from "./screens/branches/Branches";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/organisation"
        element={
          <Layout>
            <Organizations />
          </Layout>
        }
      />
      <Route
        path="/expenses"
        element={
          <Layout>
            <ExpensesTable />
          </Layout>
        }
      />
      <Route
        path="/bulk-uploads"
        element={
          <Layout>
            <BulkUploadScreen />
          </Layout>
        }
      />
      <Route
        path="/spend-categories"
        element={
          <Layout>
            <CategoriesScreen />
          </Layout>
        }
      />
      <Route
        path="/policies"
        element={
          <Layout>
            <Policies />
          </Layout>
        }
      />
      <Route
        path="/users"
        element={
          <Layout>
            <TeamAndMembers />
          </Layout>
        }
      />
      <Route
        path="/analytics"
        element={
          <Layout>
            <Analytics />
          </Layout>
        }
      />
      <Route
        path="/approvals"
        element={
          <Layout>
            <Approvals />
          </Layout>
        }
      />
      <Route
        path="/branches"
        element={
          <Layout>
            <Branches />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
