import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, PiggyBank, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back, John</h1>
          <p className="text-gray-500 dark:text-gray-400">Here's your financial overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700 dark:text-gray-300">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">$2,500.00</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700 dark:text-gray-300">Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">2</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700 dark:text-gray-300">Pending Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">1</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            onClick={() => navigate("/transfer")}
            className="h-32 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition-all duration-200"
            variant="outline"
          >
            <div className="flex flex-col items-center gap-2">
              <Send className="h-8 w-8" />
              <span>Send Money</span>
            </div>
          </Button>
          <Button
            onClick={() => navigate("/loans")}
            className="h-32 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition-all duration-200"
            variant="outline"
          >
            <div className="flex flex-col items-center gap-2">
              <PiggyBank className="h-8 w-8" />
              <span>Manage Loans</span>
            </div>
          </Button>
          <Button
            onClick={() => navigate("/transactions")}
            className="h-32 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600 transition-all duration-200"
            variant="outline"
          >
            <div className="flex flex-col items-center gap-2">
              <History className="h-8 w-8" />
              <span>View History</span>
            </div>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;