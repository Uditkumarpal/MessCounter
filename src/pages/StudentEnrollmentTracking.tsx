import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, Clock, UserMinus, Download, Filter, Search } from "lucide-react";
import { getUsers, updateUser, getMessBills } from "@/services";

const StudentEnrollmentTracking = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  if (!user || !isAdmin) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const allUsers = getUsers();
  const messStudents = allUsers.filter(u => 
    u.role === 'student' && 
    u.selectedMessId === user.selectedMessId
  );

  // Get bills for calculation
  const messBills = user.selectedMessId ? getMessBills(user.selectedMessId) : [];

  // Filter students based on search and status
  const filteredStudents = messStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (student.studentId && student.studentId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterStatus === 'all') return matchesSearch;
    
    const enrollmentDate = student.enrollmentDate ? new Date(student.enrollmentDate) : null;
    const nextBillingMonth = enrollmentDate ? new Date(enrollmentDate.getFullYear(), enrollmentDate.getMonth() + 1, 1) : null;
    const isActive = nextBillingMonth ? new Date() >= nextBillingMonth : false;
    
    if (filterStatus === 'active') return matchesSearch && isActive;
    if (filterStatus === 'inactive') return matchesSearch && !isActive;
    
    return matchesSearch;
  });

  const handleRemoveStudent = (studentId: string, studentName: string) => {
    updateUser(studentId, { selectedMessId: undefined });
    
    toast({
      title: "Student Removed",
      description: `${studentName} has been removed from ${user.messName}`,
    });
    
    window.location.reload();
  };

  const getStudentBillInfo = (studentId: string) => {
    const studentBills = messBills.filter(bill => bill.studentId === studentId);
    const totalBills = studentBills.length;
    const paidBills = studentBills.filter(bill => bill.status === 'paid').length;
    const pendingBills = totalBills - paidBills;
    const totalAmount = studentBills.reduce((sum, bill) => sum + bill.totalAmount, 0);
    
    return { totalBills, paidBills, pendingBills, totalAmount };
  };

  const activeStudents = messStudents.filter(student => {
    const enrollmentDate = student.enrollmentDate ? new Date(student.enrollmentDate) : null;
    const nextBillingMonth = enrollmentDate ? new Date(enrollmentDate.getFullYear(), enrollmentDate.getMonth() + 1, 1) : null;
    return nextBillingMonth ? new Date() >= nextBillingMonth : false;
  }).length;

  const inactiveStudents = messStudents.length - activeStudents;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2 h-6 w-6 text-mess-primary" />
          Student Enrollment Tracking - {user.messName}
        </h1>
        <Badge variant="outline" className="text-sm">
          {messStudents.length} Total Students
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{messStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Billing</p>
                <p className="text-2xl font-bold">{activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Waiting Period</p>
                <p className="text-2xl font-bold">{inactiveStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Bills</p>
                <p className="text-2xl font-bold">{messBills.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>
            Search and filter students enrolled in your mess
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Students</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Filter by Status</Label>
              <select
                id="status"
                className="w-full p-2 border border-input rounded-md bg-background"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              >
                <option value="all">All Students</option>
                <option value="active">Active Billing</option>
                <option value="inactive">Waiting Period</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Enrolled Students ({filteredStudents.length})
          </CardTitle>
          <CardDescription>
            Students enrolled in {user.messName} with billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStudents.length > 0 ? (
            <div className="space-y-4">
              {filteredStudents.map((student) => {
                const enrollmentDate = student.enrollmentDate ? new Date(student.enrollmentDate) : null;
                const nextBillingMonth = enrollmentDate ? new Date(enrollmentDate.getFullYear(), enrollmentDate.getMonth() + 1, 1) : null;
                const billingStatus = nextBillingMonth ? (new Date() >= nextBillingMonth ? 'Active' : `Starts ${nextBillingMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`) : 'Unknown';
                const isActive = nextBillingMonth ? new Date() >= nextBillingMonth : false;
                const billInfo = getStudentBillInfo(student.id);
                
                return (
                  <div key={student.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{student.name}</h3>
                          <Badge variant={isActive ? 'default' : 'secondary'}>
                            {isActive ? 'Active' : 'Waiting'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        {enrollmentDate && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Enrolled: {enrollmentDate.toLocaleDateString()}
                            </p>
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                              Billing Status: {billingStatus}
                            </p>
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveStudent(student.id, student.name)}
                      >
                        <UserMinus className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Total Bills</p>
                        <p className="font-semibold">{billInfo.totalBills}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Paid</p>
                        <p className="font-semibold text-green-600">{billInfo.paidBills}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Pending</p>
                        <p className="font-semibold text-orange-600">{billInfo.pendingBills}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Total Amount</p>
                        <p className="font-semibold">₹{billInfo.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== 'all' 
                  ? "No students found matching your criteria" 
                  : "No students enrolled in your mess yet"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentEnrollmentTracking;