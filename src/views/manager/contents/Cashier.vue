<template>
    <div class="container py-3">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-12">
                <div :class="`box-table ${v.status ? 'active' : ''}`" v-for="(v, i) in tables" :key="i" @click="openModalOrder(i)">
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" @click="checkout">Checkout</button>
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
        openModalOrder(index) {
            this.index = index;
            this.getOrder();
            $('#modal-show-order').modal('show');
        },
        checkout() {
            let order = this.order;
            axios.post(`/order/${order['id']}/checkout`)
            .then(res => {
                if (res.data.status) {
                    $('#modal-show-order').modal('hide');
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