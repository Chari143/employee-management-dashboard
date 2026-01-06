import express from 'express';
import cors from 'cors';
import prisma from './prisma';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// get one employee
app.get('/api/employees/:id', async (req, res) => {
    try {
        const emp = await prisma.employee.findUnique({
            where: { id: req.params.id }
        });
        if (!emp) return res.status(404).json({ error: 'Not found' });
        res.json(emp);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
});

// create employee
app.post('/api/employees', async (req, res) => {
    try {
        // Generate new Employee ID
        const lastEmp = await prisma.employee.findFirst({
            orderBy: { employeeId: 'desc' }
        });

        let nextId = 'EMP001';
        if (lastEmp && lastEmp.employeeId) {
            const currentId = lastEmp.employeeId;
            const numericPart = parseInt(currentId.replace('EMP', ''));
            nextId = `EMP${String(numericPart + 1).padStart(3, '0')}`;
        }

        const newEmp = await prisma.employee.create({
            data: { ...req.body, employeeId: nextId }
        });
        res.status(201).json(newEmp);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create employee' });
    }
});

// update employee
app.put('/api/employees/:id', async (req, res) => {
    try {
        const updated = await prisma.employee.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update employee' });
    }
});

// delete employee
app.delete('/api/employees/:id', async (req, res) => {
    try {
        await prisma.employee.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

// toggle status
app.patch('/api/employees/:id/toggle', async (req, res) => {
    try {
        const emp = await prisma.employee.findUnique({
            where: { id: req.params.id }
        });
        if (!emp) return res.status(404).json({ error: 'Not found' });

        const updated = await prisma.employee.update({
            where: { id: req.params.id },
            data: { isActive: !emp.isActive }
        });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to toggle status' });
    }
});

// seed initial data
app.post('/api/seed', async (req, res) => {
    try {
        const count = await prisma.employee.count();
        if (count > 0) {
            return res.json({ message: 'Database already has data' });
        }

        await prisma.employee.createMany({
            data: [
                {
                    employeeId: 'EMP001',
                    fullName: 'Hari Chari',
                    gender: 'male',
                    dateOfBirth: '1990-05-15',
                    profileImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hari',
                    state: 'Andhra Pradesh',
                    isActive: true,
                },
                {
                    employeeId: 'EMP002',
                    fullName: 'Priya',
                    gender: 'female',
                    dateOfBirth: '1992-08-22',
                    profileImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Priya',
                    state: 'Gujarat',
                    isActive: true,
                },
                {
                    employeeId: 'EMP003',
                    fullName: 'Kumar',
                    gender: 'male',
                    dateOfBirth: '1988-12-10',
                    profileImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kumar',
                    state: 'Karnataka',
                    isActive: false,
                },
                {
                    employeeId: 'EMP004',
                    fullName: 'Sneha',
                    gender: 'female',
                    dateOfBirth: '1995-03-28',
                    profileImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sneha',
                    state: 'Telangana',
                    isActive: true,
                },
                {
                    employeeId: 'EMP005',
                    fullName: 'Vikram',
                    gender: 'male',
                    dateOfBirth: '1985-07-04',
                    profileImage: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Vikram',
                    state: 'Delhi',
                    isActive: false,
                },
            ]
        });
        res.json({ message: 'Database seeded with sample data' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to seed database' });
    }
});

app.listen(5000, () => console.log('Backend running on port 5000'));
