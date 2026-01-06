import express from 'express';
import cors from 'cors';
import { employees, generateId } from './data';
import { Employee } from './types';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// get all
app.get('/api/employees', (req, res) => {
    res.json(employees);
});

// get one
app.get('/api/employees/:id', (req, res) => {
    const emp = employees.find(e => e.id === req.params.id);
    if (!emp) return res.status(404).json({ error: 'Not found' });
    res.json(emp);
});

// create
app.post('/api/employees', (req, res) => {
    const newEmp: Employee = { ...req.body, id: generateId() };
    employees.push(newEmp);
    res.status(201).json(newEmp);
});

// update
app.put('/api/employees/:id', (req, res) => {
    const idx = employees.findIndex(e => e.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    employees[idx] = { ...employees[idx], ...req.body };
    res.json(employees[idx]);
});

// delete
app.delete('/api/employees/:id', (req, res) => {
    const idx = employees.findIndex(e => e.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    employees.splice(idx, 1);
    res.status(204).send();
});

// toggle status
app.patch('/api/employees/:id/toggle', (req, res) => {
    const emp = employees.find(e => e.id === req.params.id);
    if (!emp) return res.status(404).json({ error: 'Not found' });
    emp.isActive = !emp.isActive;
    res.json(emp);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
