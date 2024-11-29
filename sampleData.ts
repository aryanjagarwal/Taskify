interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: string;
}

const sampleTasks: Task[] = [
    {
      id: '1',
      title: 'Grocery Shopping',
      dueDate: 'Tomorrow',
      priority: 'High',
    },
    {
      id: '2',
      title: 'Project Meeting',
      dueDate: 'Today 2 PM',
      priority: 'Medium',
    },
    {
      id: '3',
      title: 'Doctor\'s Appointment',
      dueDate: '25th Oct',
      priority: 'Low',
    },
    {
      id: '4',
      title: 'Submit Report',
      dueDate: '28th Oct',
      priority: 'High',
    },
    {
      id: '5',
      title: 'Call Plumber',
      dueDate: '30th Oct',
      priority: 'Medium',
    },
  ];

  export default sampleTasks;