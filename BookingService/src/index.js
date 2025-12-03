// const express=require("express");
// const bodyParser=require("body-parser");
// const {PORT}=require("./config/serverConfig");
// const db=require("./models/index");

// const apiRoutes=require("./routes/index");

// const setUpAndStartServer=()=>{
//     const app=express();

//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({extended:true}));

//     app.use("/bookingService/api",apiRoutes);

//     app.listen(PORT,()=>{
//         console.log(`Server started on PORT ${PORT}`);
//         if(process.env.DB_SYNC){
//             db.sequelize.sync({alter:true});
//         }
//     });
// }


// setUpAndStartServer();


// import React, { useState, useMemo, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
// import { Calendar, Trophy, Target, TrendingUp, Award, Brain, Activity, ArrowLeft, Mail, User, User2, Users, Crown, Loader2 } from 'lucide-react';
// import axios from 'axios';

// // Mock CalendarHeatmap component since it's not in available libraries
// const CalendarHeatmap = ({ variantClassnames, weightedDates, onDateClick }) => {
//     const weeks = 53;
//     const days = 7;

//     const generateHeatmapData = () => {
//         const data = [];
//         const today = new Date();

//         for (let week = 0; week < weeks; week++) {
//             const weekData = [];
//             for (let day = 0; day < days; day++) {
//                 const date = new Date(today);
//                 date.setDate(date.getDate() - (weeks - week - 1) * 7 - (days - day - 1));

//                 // Find weight for this date
//                 const weightedDate = weightedDates?.find(wd =>
//                     wd.date.toDateString() === date.toDateString()
//                 );

//                 weekData.push({
//                     date: date.toISOString().split('T')[0],
//                     weight: weightedDate?.weight || Math.floor(Math.random() * 4),
//                     day: date.getDay()
//                 });
//             }
//             data.push(weekData);
//         }
//         return data;
//     };

//     const heatmapData = generateHeatmapData();

//     const getIntensityClass = (weight) => {
//         if (weight === 0) return 'bg-gray-100 dark:bg-gray-800';
//         if (weight <= 3) return 'bg-green-200 dark:bg-green-900';
//         if (weight <= 6) return 'bg-green-400 dark:bg-green-700';
//         if (weight <= 9) return 'bg-green-600 dark:bg-green-500';
//         return 'bg-green-800 dark:bg-green-400';
//     };

//     return (
//         <div className="w-full overflow-x-auto">
//             <div className="grid grid-cols-53 gap-1 min-w-max">
//                 {heatmapData.map((week, weekIndex) => (
//                     <div key={weekIndex} className="flex flex-col gap-1">
//                         {week.map((day, dayIndex) => (
//                             <div
//                                 key={`${weekIndex}-${dayIndex}`}
//                                 className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-blue-300 ${getIntensityClass(day.weight)}`}
//                                 title={`${day.date}: ${day.weight} problems`}
//                                 onClick={() => onDateClick && onDateClick(day.date)}
//                             />
//                         ))}
//                     </div>
//                 ))}
//             </div>
//             <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
//                 <span>Less</span>
//                 <div className="flex gap-1">
//                     <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
//                     <div className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded-sm"></div>
//                     <div className="w-3 h-3 bg-green-400 dark:bg-green-700 rounded-sm"></div>
//                     <div className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-sm"></div>
//                     <div className="w-3 h-3 bg-green-800 dark:bg-green-400 rounded-sm"></div>
//                 </div>
//                 <span>More</span>
//             </div>
//         </div>
//     );
// };

// // API functions
// const api = {
//     getContestHistory: async (handle, days = 365) => {
//         const response = await axios.get(`http://localhost:4000/api/v1/contests/${handle}?days=${days}`);
//         if (!response.statusText=="OK") throw new Error('Failed to fetch contest history');
//         return response.data;
//     },

//     getProblemStats: async (handle, days = 30) => {
        
//         const response = await axios.get(`http://localhost:4000/api/v1/submissions/${handle}?days=${days}`);

//         if (!response.statusText=="OK") throw new Error('Failed to fetch problem stats');
//         return response.data;
//     }
// };

// const getRatingColor = (rating) => {
//     if (rating >= 3000) return 'bg-red-600 dark:bg-red-500';
//     if (rating >= 2400) return 'bg-red-500 dark:bg-red-400';
//     if (rating >= 2100) return 'bg-orange-500 dark:bg-orange-400';
//     if (rating >= 1900) return 'bg-purple-500 dark:bg-purple-400';
//     if (rating >= 1600) return 'bg-blue-500 dark:bg-blue-400';
//     if (rating >= 1400) return 'bg-cyan-500 dark:bg-cyan-400';
//     if (rating >= 1200) return 'bg-green-500 dark:bg-green-400';
//     return 'bg-gray-500 dark:bg-gray-400';
// };

// const getRatingTitle = (rating) => {
//     if (rating >= 3000) return 'legendary grandmaster';
//     if (rating >= 2400) return 'international grandmaster';
//     if (rating >= 2100) return 'grandmaster';
//     if (rating >= 1900) return 'international master';
//     if (rating >= 1600) return 'master';
//     if (rating >= 1400) return 'candidate master';
//     if (rating >= 1200) return 'expert';
//     return 'unrated';
// };

// function getRelativeTime(date) {
//     const now = new Date();
//     const diff = now - date;

//     const seconds = Math.floor(diff / 1000);
//     const minutes = Math.floor(diff / (1000 * 60));
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const months = Math.floor(days / 30);
//     const years = Math.floor(days / 365);

//     const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

//     if (years > 0) return rtf.format(-years, 'year');
//     if (months > 0) return rtf.format(-months, 'month');
//     if (days > 0) return rtf.format(-days, 'day');
//     if (hours > 0) return rtf.format(-hours, 'hour');
//     if (minutes > 0) return rtf.format(-minutes, 'minute');
//     return rtf.format(-seconds, 'second');
// }

// // Transform backend rating distribution to frontend format
// const transformRatingDistribution = (ratingBuckets) => {
//     const buckets = [
//         { rating: '0-600', count: 0 },
//         { rating: '600-1200', count: 0 },
//         { rating: '1200-1400', count: 0 },
//         { rating: '1400-1600', count: 0 },
//         { rating: '1600-1900', count: 0 },
//         { rating: '1900-2100', count: 0 },
//         { rating: '2100-2300', count: 0 },
//         { rating: '2300-2400', count: 0 },
//         { rating: '2400-2600', count: 0 },
//         { rating: '2600-3000', count: 0 },
//         { rating: '3000+', count: 0 }
//     ];

//     Object.entries(ratingBuckets).forEach(([rating, count]) => {
//         const r = parseInt(rating);
//         if (r < 600) buckets[0].count += count;
//         else if (r < 1200) buckets[1].count += count;
//         else if (r < 1400) buckets[2].count += count;
//         else if (r < 1600) buckets[3].count += count;
//         else if (r < 1900) buckets[4].count += count;
//         else if (r < 2100) buckets[5].count += count;
//         else if (r < 2300) buckets[6].count += count;
//         else if (r < 2400) buckets[7].count += count;
//         else if (r < 2600) buckets[8].count += count;
//         else if (r < 3000) buckets[9].count += count;
//         else buckets[10].count += count;
//     });

//     return buckets;
// };

// // Transform contest data for chart
// const transformContestData = (contests) => {
//     return contests.map(contest => ({
//         date: contest.contestCreatedAt,
//         contest: contest.contestName,
//         rank: contest.rank,
//         oldRating: contest.oldRating,
//         newRating: contest.newRating,
//         change: contest.newRating - contest.oldRating
//     }));
// };

export const UserProfilePage = ({ handle = "Fefer_Ivan", onBack }) => {
    const [contestFilter, setContestFilter] = useState(365);
    const [problemFilter, setProblemFilter] = useState(30);
    const [contestData, setContestData] = useState(null);
    const [problemData, setProblemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [contestResponse, problemResponse] = await Promise.all([
                    api.getContestHistory(handle, contestFilter),
                    api.getProblemStats(handle, problemFilter)
                ]);

                setContestData(contestResponse);
                setProblemData(problemResponse);
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [handle, contestFilter, problemFilter]);

    // Transform data for display
    const user = contestData?.user || {};
    const contests = contestData?.contests || [];
    const problemStats = problemData?.stats || {};

    const filteredContestHistory = useMemo(() => {
        return transformContestData(contests).sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [contests]);

    const ratingDistribution = useMemo(() => {
        return transformRatingDistribution(problemStats.ratingDistribution || {});
    }, [problemStats.ratingDistribution]);

    // Generate heatmap data from backend
    const heatmapData = useMemo(() => {
        if (!problemStats.heatmapData) return [];

        return Object.entries(problemStats.heatmapData).map(([date, count]) => ({
            date: new Date(date),
            weight: count
        }));
    }, [problemStats.heatmapData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">Loading profile...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Profile</h2>
                    <p className="text-gray-600 dark:text-gray-400">{error}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="hover:bg-white/60 dark:hover:bg-gray-800/60"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Users
                    </Button>
                </div>

                {/* Student Header Card */}
                <Card className="border-2 rounded-2xl border-gray-100 dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm">
                    <CardContent className="px-10 py-6">
                        <div className="flex items-start gap-6 justify-between">
                            <div className='flex flex-col gap-4 self-stretch'>
                                <div className='flex gap-4'>
                                    <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-gray-700 shadow-lg">
                                        <AvatarImage src={`https://userpic.codeforces.org/242/avatar/c4e6a102a9e66281.jpg`} alt={user.handle} />
                                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                            {user.firstName?.[0] || 'U'}{user.lastName?.[0] || 'N'}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 pt-4">
                                        <div className="flex items-center gap-4">
                                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                                {user.handle || 'Unknown User'}
                                            </h1>
                                        </div>
                                        <p className="text-lg text-gray-600 dark:text-gray-400">
                                            {user.firstName} {user.lastName}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-4 items-center pt-2'>
                                        <div className="flex justify-center">
                                            <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getRatingColor(user.currentRating || 0)}`}>
                                                {getRatingTitle(user.currentRating || 0)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-4 px-1 pt-2'>
                                        <Mail className='h-4 w-4 text-blue-500' />
                                        <span className='font-medium text-blue-600 dark:text-blue-400 text-sm'>
                                            {user.handle}@codeforces.com
                                        </span>
                                    </div>

                                    <div className='flex gap-4 items-center pt-1 px-1'>
                                        <Users className='h-4 w-4 text-red-500' />
                                        <span className='text-red-600 dark:text-red-400 text-sm'>
                                            Active competitive programmer
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='w-[0.5px] self-stretch bg-gray-200 dark:bg-gray-700'></div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl">
                                    <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                        {user.currentRating || 0}
                                    </div>
                                    <div className="text-sm text-blue-600 dark:text-blue-400">Current Rating</div>
                                </div>

                                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50 rounded-xl">
                                    <Target className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                                        {problemStats.totalProblems || 0}
                                    </div>
                                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Problems Solved</div>
                                </div>

                                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-xl">
                                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                                        {user.maxRating || 0}
                                    </div>
                                    <div className="text-sm text-purple-600 dark:text-purple-400">Max Rating</div>
                                </div>

                                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/50 dark:to-orange-800/50 rounded-xl">
                                    <Crown className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                                        {problemStats.maxRating || 0}
                                    </div>
                                    <div className="text-sm text-orange-600 dark:text-orange-400">Hardest Problem</div>
                                </div>

                                <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/50 dark:to-cyan-800/50 rounded-xl">
                                    <Activity className="h-6 w-6 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                                        {problemStats.avgProblemsPerDay?.toFixed(1) || '0.0'}
                                    </div>
                                    <div className="text-sm text-cyan-600 dark:text-cyan-400">Problems/Day</div>
                                </div>

                                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                                        {problemStats.avgRating || 0}
                                    </div>
                                    <div className="text-sm text-green-600 dark:text-green-400">Average Rating</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Tabs */}
                <div>
                    <Tabs defaultValue="contests" className="space-y-4">
                        <TabsList className="grid h-12 w-full grid-cols-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-100 dark:border-gray-700 border-2">
                            <TabsTrigger value="contests" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                                <Calendar className="h-6 w-6 mr-1" />
                                <span className='font-medium mt-1'>Contest History</span>
                            </TabsTrigger>
                            <TabsTrigger value="problems" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                                <Brain className="h-6 w-6 mr-1" />
                                <span className='font-medium mt-1'>Problem Solving</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Contest History Tab */}
                        <TabsContent value="contests" className="space-y-6">
                            <Card className="shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-100 dark:border-gray-700 border-2">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100">
                                            Rating Progress
                                        </CardTitle>
                                        <div className="flex gap-2">
                                            {[30, 90, 365].map((days) => (
                                                <Button
                                                    key={days}
                                                    variant={contestFilter === days ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setContestFilter(days)}
                                                    className="font-medium"
                                                >
                                                    {days} days
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-80 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={filteredContestHistory}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-600" />
                                                <XAxis
                                                    dataKey="date"
                                                    stroke="#64748b"
                                                    className="dark:stroke-gray-400"
                                                    tickFormatter={(date) =>
                                                        new Date(date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })
                                                    }
                                                />
                                                <YAxis stroke="#64748b" className="dark:stroke-gray-400" domain={['auto', 'auto']} />
                                                <Tooltip
                                                    labelFormatter={(date) => {
                                                        const d = new Date(date);
                                                        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
                                                    }}
                                                    contentStyle={{
                                                        backgroundColor: 'white',
                                                        border: '1px solid #e2e8f0',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                                    }}
                                                    className="dark:bg-gray-800 dark:border-gray-600"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="newRating"
                                                    stroke="#3b82f6"
                                                    strokeWidth={3}
                                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-2 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-100 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100">
                                        Recent Contests
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[...filteredContestHistory].reverse().map((contest, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/50 dark:hover:to-blue-800/50 transition-colors"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{contest.contest}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {getRelativeTime(new Date(contest.date))}
                                                    </p>
                                                </div>
                                                <div className="text-center px-4">
                                                    <div className="text-lg font-medium text-gray-900 dark:text-gray-100">{contest.rank}</div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400">Rank</div>
                                                </div>
                                                <div className="text-center px-4">
                                                    <div className="text-lg font-medium text-gray-900 dark:text-gray-100">{contest.newRating}</div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                                                </div>
                                                <div className="text-center">
                                                    <Badge
                                                        variant={contest.change >= 0 ? "default" : "destructive"}
                                                        className={`${contest.change >= 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                                                    >
                                                        {contest.change >= 0 ? '+' : ''}{contest.change}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Problem Solving Tab */}
                        <TabsContent value="problems" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                                <Card className="shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm col-span-3 border-2 border-gray-100 dark:border-gray-700">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100">
                                                Problem Rating Distribution
                                            </CardTitle>
                                            <div className="flex gap-2">
                                                {[7, 30, 90].map((days) => (
                                                    <Button
                                                        key={days}
                                                        variant={problemFilter === days ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setProblemFilter(days)}
                                                    >
                                                        {days}d
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80 w-full flex justify-center items-center pr-8">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={ratingDistribution}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-gray-600" />
                                                    <XAxis dataKey="rating" stroke="#64748b" className="dark:stroke-gray-400" />
                                                    <YAxis stroke="#64748b" className="dark:stroke-gray-400" />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: 'white',
                                                            border: '1px solid #e2e8f0',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                                        }}
                                                        className="dark:bg-gray-800 dark:border-gray-600"
                                                    />
                                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                                        {ratingDistribution.map((entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill="#3b82f6"
                                                                fillOpacity={0.8}
                                                                className="hover:!fill-yellow-400 dark:hover:!fill-yellow-300 transition-all duration-300"
                                                            />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-2 shadow-lg bg-white/80 backdrop-blur-sm col-span-2 border-gray-100 dark:border-[#383838]">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-medium copper-font">Submission Heatmap</CardTitle>
                                        <p className="text-xs text-gray-600 capriola-font">Last 365 days activity</p>                                     </CardHeader>
                                    <CardContent>
                                        <CalendarHeatmap
                                            variantClassnames={[
                                                "text-white bg-green-400 hover:bg-green-500",
                                                "text-white bg-green-500 hover:bg-green-600",
                                                "text-white bg-green-700 hover:bg-green-800"
                                            ]}
                                            weightedDates={[
                                                { date: new Date('2025-06-01'), weight: 5 },
                                                { date: new Date('2025-06-15'), weight: 12 },
                                                { date: new Date('2025-06-20'), weight: 8 }
                                            ]}
                                            onDateClick={(date) => console.log('Clicked:', date)}
                                        />
                                    </CardContent>
                                </Card>
                                {/* Recent Problem Submissions */}
                                <Card className="border-2 shadow-lg bg-white/80 backdrop-blur-sm border-gray-100 dark:border-[#383838] col-span-5">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-medium copper-font">Recent Submissions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {[...filteredContestHistory].reverse().map((contest, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-2 px-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-colors"
                                                >
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900 copper-font">{contest.contest}</h3>
                                                        <p className="text-sm text-gray-600 capriola-font">{getRelativeTime(new Date(contest.date))}</p>
                                                    </div>
                                                    <div className="text-center px-4">
                                                        <div className="text-lg font-medium text-gray-900 capriola-font">{contest.rank}</div>
                                                        <div className="text-xs text-gray-600 copper-font">Language</div>
                                                    </div>
                                                    <div className="text-center px-4">
                                                        <div className="text-lg font-medium text-gray-900 copper-font">{contest.newRating}</div>
                                                        <div className="text-xs text-gray-600 copper-font">Rating</div>
                                                    </div>

                                                    <div className="text-center px-4">
                                                        <div className="text-lg font-medium text-gray-900 copper-font">{contest.rank}</div>
                                                        <div className="text-xs text-gray-600 copper-font">Verdict</div>
                                                    </div>


                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};