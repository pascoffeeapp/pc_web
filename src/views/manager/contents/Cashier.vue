<template>
    <div class="container py-3">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-12 p-3" v-for="(v, i) in tables" :key="i" >
                <div :class="`box-table ${v.status ? 'active' : ''}`" @click="openModalOrder(i, v.status)">
                    <div class="name text-uppercase">{{ v.code }}</div>
                    <div class="text">{{ v.status ? 'RESERVED' : 'FREE'}}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Show Order -->
    <div class="modal fade" id="modal-show-order" tabindex="-1" aria-labelledby="modal-show-orderLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-show-orderLabel">Pesanan Meja ({{ tables[index] ? tables[index].code : '' }})</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped table-bordered">
                        <thead class="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Nama</th>
                                <th>Jumlah</th>
                                <th>Harga</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="items.length == 0">
                                <td colspan="5" class="text-center">Tidak Ada Pesanan</td>
                            </tr>
                            <tr v-for="(v, i) in items" :key="i">
                                <td>{{ i+1 }}</td>
                                <td>{{ v.name }}</td>
                                <td>{{ v.qty }}</td>
                                <td>{{ formatCurrency(v.price) }}</td>
                                <td>{{ formatCurrency(parseInt(v.price) * parseInt(v.qty)) }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4">Total:</th>
                                <th>{{ formatCurrency(total) }}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="container">
                        <div class="row">
                            <div class="col-10" style="padding-right: 1rem;">
                                <input type="number" class="form-control" v-model="paid">
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-success w-100" @click="checkout">Bayar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-checkout" v-if="order" tabindex="-1" aria-labelledby="modal-checkoutLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-checkoutLabel">Pesanan Berhasil Dibayar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table w-100">
                        <tr>
                            <td>Nomor Meja</td>
                            <td>: {{ order.reserved_table.code }}</td>
                        </tr>
                        <tr>
                            <td>Waiter</td>
                            <td>: {{ order.user.username}}</td>
                        </tr>
                        <tr>
                            <td>Tipe Pesanan</td>
                            <td>: {{ ((order.isTakeAway) ? 'Take Away' : 'Dine in') }}</td>
                        </tr>
                        <tr>
                            <td>Dibayar pada</td>
                            <td>: {{ order.done_at }}</td>
                        </tr>
                    </table>
                    <table class="table table-striped table-bordered">
                        <thead class="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Nama</th>
                                <th>Jumlah</th>
                                <th>Harga</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="items.length == 0">
                                <td colspan="5" class="text-center">Tidak Ada Pesanan</td>
                            </tr>
                            <tr v-for="(v, i) in items" :key="i">
                                <td>{{ i+1 }}</td>
                                <td>{{ v.name }}</td>
                                <td>{{ v.qty }}</td>
                                <td>{{ formatCurrency(v.price) }}</td>
                                <td>{{ formatCurrency(parseInt(v.price) * parseInt(v.qty)) }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4">Total:</th>
                                <th>{{ formatCurrency(total) }}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="alert alert-primary">
                        Uang kembalian sebesar {{ formatCurrency(Math.abs(paid-total)) }}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            tables: [],
            index: null,
            order: null,
            items: [],
            total: 0,
            paid: 0,
        }
    },
    methods: {
        formatCurrency(number) {
            return parseInt(number).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
            })
        },
        getTables() {
            axios.get('/table')
            .then(res => {
                if (res.data.status) {
                    this.tables = res.data.body;
                }
            })
        },
        getItems() {
            if (this.order) {
                return this.order['items'];
            }
            return [];
        },
        async getOrder() {
            let table = this.tables[this.index];
            await axios.get(`/table/${table.id}/order`)
            .then(res => {
                this.order = res.data.body;
                this.items = res.data.body['items'];
                this.total = 0;
                this.items.forEach(item => {
                    this.total += parseInt(item.price) * parseInt(item.qty);
                })
            })
        },
        openModalOrder(index, isFree = false) {
            if (isFree) {
                this.index = index;
                this.getOrder();
                $('#modal-show-order').modal('show');
            }
        },
        openModalEdit(index) {
            this.index = index;
            $('#modal-edit-order').modal('show');
        },
        checkout() {

            if (this.paid <= 0) {
                Swal.fire('GAGAL', "Tolong masukan jumlah yang ingin dibayar", 'error');
                return false;
            }

            let order = this.order;
            if (this.paid < this.total)  {
                Swal.fire('GAGAL', "Uang anda tidak mencukupi untuk melakukan pembelian ini!", 'error');
                return false;
            }

            axios.post(`/order/${order['id']}/checkout`)
            .then(res => {
                if (res.data.status) {
                    $('#modal-show-order').modal('hide');
                    this.order = res.data.body;
                    $('#modal-checkout').modal('show');
                    this.order = null;
                    this.index = null;
                    Swal.fire('BERHASIL', res.data.message, 'success');
                    this.getTables();
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status != 400) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
            })
        }
    },
    mounted() {
        this.getTables();
        setInterval(() => {
            this.getTables();
        }, 5000)
    }
}
</script>