
import React , {useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Layout, Mail, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { formatDateTime } from '../../utils/formatDateTime';
// import {useToast} from "@/components/ui/use-toast"
import toast from "react-hot-toast"
import axios from "../../utils/axiosInstance"


export const DashboardOverview = ({ projects = [], leads=[] , services, setLeads }) => {
  const [editedStatuses, setEditedStatuses] = useState({});

  // const {toast} = useToast()

  const leadStatuses = [
    "New",
    "Contacted",
    "Consultation Scheduled",
    "Consultation Completed",
    "Proposal Sent",
    "Negotiation",
    "Won / Project Confirmed",
    "Lost / Not Interested",
    "On Hold",
    "Cancelled",
  ]


  const handleLeadStatusChange = (id, status) => {
    try{
      const response = axios.put("/api/leads/"+id, {status})
      console.log({response})
    // toast({
    //   title:"Updated",
    //   description : "Service updated successfully"
    // })
    toast.success("Service updated successfully")
    setEditedStatuses(prev => {
      const newEdits = { ...prev };
      delete newEdits[id];
      return newEdits;
    });
    
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead._id === id ? { ...lead, status } : lead
      )
    );
    }
    catch(error){
      console.log(error)
      // toast({
      //   title:"Error",
      //   description : "Service updated successfully"
      // })
      toast.error("Error in updating lead status")
    }
  }


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Total Projects</CardTitle>
                  <CardDescription>All-time projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Layout className="h-8 w-8 text-primary mr-3" />
                    <span className="text-3xl font-bold">{projects && projects.length>0 ? projects.length : 0}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Active Projects</CardTitle>
                  <CardDescription>Currently in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Layout className="h-8 w-8 text-primary mr-3" />
                    <span className="text-3xl font-bold">{projects && projects.length>0 ? projects.filter(project => project.status.toLowerCase() !== 'inactive').length : 0}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">New Leads</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Mail className="h-8 w-8 text-primary mr-3" />
                    <span className="text-3xl font-bold">
                    {leads && leads.length > 0
                      ? leads.filter(lead => {
                          if (!lead.date) return false;
                          const leadDate = new Date(lead.date);
                          const now = new Date();
                          const thirtyDaysAgo = new Date();
                          thirtyDaysAgo.setDate(now.getDate() - 30);
                          return leadDate >= thirtyDaysAgo && leadDate <= now;
                        }).length
                      : 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Ongoing Clients</CardTitle>
                  <CardDescription>Ongoing clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-primary mr-3" />
                    <span className="text-3xl font-bold">{leads && leads.length > 0 ? leads.filter(lead => lead.status.toLowerCase() !== 'new').length : 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="leads">
              <TabsList className="mb-6">
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="clients">Ongoing clients</TabsTrigger>
              </TabsList>


                <TabsContent value="leads">
                <Card>
                  <CardHeader>
                    <CardTitle>New Leads</CardTitle>
                    <CardDescription>New leads through inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted border-b">
                              <th className="py-3 px-4 text-left">Client/Project</th>
                              <th className="py-3 px-4 text-left">Contact</th>
                              <th className="py-3 px-4 text-left">Service Type</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date & Time</th>
                              <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leads && leads.length > 0 && leads.filter(lead => lead.status.toLowerCase() === "new").length > 0 ? (
                              leads
                                .filter(lead => lead.status.toLowerCase() === "new")
                                .map((lead) => (
                                  <tr key={lead.id} className="border-b">
                                    <td className="py-3 px-4">{lead.name}</td>
                                    <td className="py-3 px-4">{lead.phone}</td>
                                    <td className="py-3 px-4"> {lead.serviceType? lead.serviceType.title : ""}</td>
                                    <td>
                                    <select
                                       value={editedStatuses[lead._id] || lead.status?.toLowerCase()}
                                        onChange={(e) => {
                                          const newStatus = e.target.value;
                                          setEditedStatuses(prev => ({
                                            ...prev,
                                            [lead._id]: newStatus
                                          }));
                                        }}
                                        
                                        className="border border-gray-300 rounded-md px-2 py-1"
                                      >
                                        {
                                          leadStatuses.map((status) => (
                                            <option key={status} value={status.toLowerCase()}>
                                              {status}
                                            </option>
                                          ))
                                        }
                                      </select>
                                      </td>
                                    <td className="py-3 px-4"> {formatDateTime(lead.date)}</td>
                                    <td className="py-3 px-4">
                                      <div className="flex gap-2">
                                    
                                       <Button
                                            type="button"
                                            className="px-3 py-1"
                                            onClick={() => {
                                              const newStatus = editedStatuses[lead._id];
                                              if (newStatus && newStatus !== lead.status?.toLowerCase()) {
                                                handleLeadStatusChange(lead._id, newStatus);
                                              }
                                            }}
                                          >
                                            Save
                                          </Button>
                                          </div>
                                    </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                <td colSpan="6" className="py-6 px-4 text-center text-muted-foreground">
                                      No New Leads found
                                  </td>
                              </tr>
                            )}
                          </tbody>

                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>


              <TabsContent value="clients">
                <Card>
                  <CardHeader>
                    <CardTitle>Ongoing clients</CardTitle>
                    <CardDescription>Ongoing Clients and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted border-b">
                              <th className="py-3 px-4 text-left">Name</th>
                              <th className="py-3 px-4 text-left">Contact</th>
                              <th className="py-3 px-4 text-left">Service Type</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date</th>
                              <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leads && leads.length > 0 && leads.filter(lead => lead.status.toLowerCase() !== "new").length > 0 ? (
                              leads
                                .filter(lead => lead.status.toLowerCase() !== "new")
                                .map((lead) => (
                                  <tr key={lead.id} className="border-b">
                                    <td className="py-3 px-4">{lead.name}</td>
                                    <td className="py-3 px-4">{lead.phone}</td>
                                    <td className="py-3 px-4"> {lead.serviceType ? lead.serviceType.title : ""}</td>
                                    <td>
                                    <select
                                        value={editedStatuses[lead._id] || lead.status?.toLowerCase()}

                                        onChange={(e) => {
                                          const newStatus = e.target.value;
                                          setEditedStatuses(prev => ({
                                            ...prev,
                                            [lead._id]: newStatus
                                          }));
                                        }}
                                        
                                        className="border border-gray-300 rounded-md px-2 py-1"
                                      >
                                        {
                                          leadStatuses.map((status) => (
                                            <option key={status} value={status.toLowerCase()}>
                                              {status}
                                            </option>
                                          ))
                                        }
                                      </select>
                                      </td>
                                    <td className="py-3 px-4"> {formatDateTime(lead.date)}</td>
                                    <td className="py-3 px-4">
                                      <div className="flex gap-2">
                                      </div> 
                                      
                                      <Button
                                          type="button"
                                          className="px-3 py-1"
                                          onClick={() => {
                                            const newStatus = editedStatuses[lead._id];
                                            if (newStatus && newStatus !== lead.status?.toLowerCase()) {
                                              handleLeadStatusChange(lead._id, newStatus);
                                            }
                                          }}
                                        >
                                          Save
                                        </Button>
                                      </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                 <td colSpan="6" className="py-6 px-4 text-center text-muted-foreground">
                                      No ongoing clients found
                                  </td>
                              </tr>
                            )}
                          </tbody>

                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
    </>
  );
};