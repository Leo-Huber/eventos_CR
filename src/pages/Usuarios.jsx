import { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simular fetching user data de una API
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },   //id puede ser RUC
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Peter Jones', email: 'peter@example.com' },
    ];
    setUsers(mockUsers);
  }, []);

  return (
    <Container>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Usuarios
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>   {/*ID puede ser RUC*/}
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Users;
