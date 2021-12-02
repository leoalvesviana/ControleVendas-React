import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useState, FC, ChangeEvent } from 'react';
import api from 'src/service/api';
import ModalEditCliente from 'src/content/pages/Components/ModalEditCliente';
import ModalDelCliente from 'src/content/pages/Components/ModalDelCliente';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Tooltip,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button,
  IconButton
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import BulkActions from './BulkActions';
import { Link, Navigate, useNavigate } from 'react-router-dom';


interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: Cliente[];
  setClienteList: Dispatch<SetStateAction<t.Cliente[]>>;
  clienteList: t.Cliente[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

interface Cliente {
  codigo: number;
  nome: string;
  tratameno: string;
  data: Date;
  telefone1?: string;
  telefone2?: string;
  email1?: string;
  email2?: string;
  observacoes?: string;
  foto?: string;
  status: string;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: Cliente[],
  filters: Filters
): Cliente[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: Cliente[],
  page: number,
  limit: number
): Cliente[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, setClienteList, clienteList }) => {

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'AGUARD PGTO',
      name: 'AGUARD PGTO'
    },
    {
      id: 'SEM COCMPRA',
      name: 'SEM COMPRA'
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.name
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.nome)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  const navigate = useNavigate();

  const [user, setUser] = useState<any>();

  const userLogado = JSON.parse(sessionStorage.getItem("UsuarioLogado"));

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("Logado")));
  },[]);

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Lista de clientes"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tratamento</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ultimo Registro</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clienteList.map((cliente) => {

              return (

                <TableRow
                  hover
                  key={cliente.codigo}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cliente.nome}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cliente.tratameno}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cliente.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {(new Date(cliente.data)).toLocaleDateString('pt-BR')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" style={{ display: 'flex' }}>
                    <IconButton color="success" size="small" onClick={() => (navigate(`../pedidos`, { state: { codigo: cliente.codigo } }))}><AddShoppingCartIcon fontSize="small" /></IconButton>
                    {user && user.admin === true &&
                      <ModalEditCliente codigo={cliente.codigo} setClientes={setClienteList}/>
                    }
                    {user && user.admin === true &&
                      <ModalDelCliente Codigo={cliente.codigo} setClientes={setClienteList} />
                    }
                    {user && user.admin === true &&
                    <IconButton color="primary" size="small" onClick={() => (navigate(`../DetailsCliente/`, { state: { codigo: cliente.codigo } }))}><AssignmentTwoToneIcon fontSize="small" /></IconButton>
                    }
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;

