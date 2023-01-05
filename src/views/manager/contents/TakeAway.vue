<template>
    <div class="container py-3">

        <h1>Take Away Order</h1>

        <div class="rounded shadow-sm p-3 bg-white">
            <div class="container">
                <div class="row row-cols-2 mb-2">
                    <div class="col-sm-7"><!-- + Add Button -->
                        <button type="button" class="btn btn-success" @click="openAddOrder">
                            <i class="fa fa-plus"></i> Tambah
                        </button>
                    </div>
                    <div class="col-sm-3 ms-auto">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th class="text-center">#</th>
                        <th>Pelanggan</th>
                        <th class="text-center">Pesanan</th>
                        <th class="text-center">Edit</th>
                        <th class="text-center">Hapus</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="orders.length == 0">
                        <td colspan="5" class="text-center">Tidak Ada Pesanan</td>
                    </tr>
                    <tr v-for="(v, i) in orders" :key="i">
                        <td class="text-center">{{ i+1 }}</td>
                        <td class="text-capitalize">{{ v.costumer.name }}</td>
                        <td class="text-center">
                            <button class="btn btn-success btn-sm w-100" @click="openModalOrder(i)"><i class="fa fa-eye"></i></button>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-warning btn-sm w-100"><i class="fa fa-edit"></i></button>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-danger btn-sm w-100"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal Show Order -->
    <div class="modal fade" id="modal-show-order" tabindex="-1" aria-labelledby="modal-show-orderLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-show-orderLabel">Pesanan Atas Nama ({{ costumer }})</h1>
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
                            <tr>
                                <td colspan="5">
                                    <button class="btn btn-primary w-100 btn-sm text-center" @click="openModalOutlet">
                                        <i class="fa fa-plus fa-"></i> Tambah Menu
                                    </button>
                                </td>
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

    <!-- Modal Add Order -->
    <div class="modal fade" id="modal-add-order" tabindex="-1" aria-labelledby="modal-add-orderLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-add-orderLabel">Tambah Pesanan</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="name">Nama: </label>
                        <input type="text" id="name" v-model="form_add.form.name" class="form-control">
                        <div class="small text-danger" v-for="(v, i) in form_add.errors.name" :key="i">{{ v }}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="addOrder">Tambah</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Checkout -->
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
                            <td>Nama Pelanggan</td>
                            <td>: {{ order.costumer.name }}</td>
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


    <!-- Modal Outlet -->
    <div class="modal fade" id="modal-show-outlet" v-if="order" tabindex="-1" aria-labelledby="modal-show-outletLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-show-outletLabel">Pilih Gerai</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped table-bordered">
                        <thead class="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Nama</th>
                                <th>Buka</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="outlets.length == 0">
                                <td colspan="5" class="text-center">Tidak Ada Gerai</td>
                            </tr>
                            <tr v-for="(v, i) in outlets" :key="i">
                                <td>{{i+1}}</td>
                                <td>{{v.name}}</td>
                                <td>
                                    <button class="btn btn-primary w-100 btn-sm" @click="openModalMenu(i)">
                                        <i class="fa fa-eye fa-fw"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="openModalOrder">Back</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Menu -->
    <div class="modal fade" id="modal-show-menu" v-if="order" tabindex="-1" aria-labelledby="modal-show-menuLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-show-menuLabel">Pilih Gerai</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped table-bordered">
                        <thead class="thead-light">
                            <tr>
                                <th class="text-center">#</th>
                                <th>Nama</th>
                                <th class="text-center">Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="outlet.menu.length == 0">
                                <td colspan="5" class="text-center">Tidak Ada Menu</td>
                            </tr>
                            <tr v-for="(v, i) in outlet.menu" :key="i">
                                <td>
                                    <div class="px-3">{{i+1}}</div>
                                </td>
                                <td class="w-100">
                                    {{v.name}}
                                </td>
                                <td class="d-flex align-items-center">
                                    <button class="btn btn-primary btn-sm">
                                        <i class="fa fa-minus fa-fw"></i>
                                    </button>
                                    <div class="px-3">
                                        <b>0</b>
                                    </div>
                                    <button class="btn btn-primary btn-sm">
                                        <i class="fa fa-eye fa-plus"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="openModalOutlet">Back</button>
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
            outlets: [],
            outlet: {
                menu: [],
            },
            costumer: '',
            orders: [],
            index: null,
            order: null,
            items: [],
            total: 0,
            paid: 0,
            form_add: {
                form: {
                    name: ''
                },
                errors: {
                    name: []
                },
            },
        }
    },
    methods: {
        formatCurrency(number) {
            return parseInt(number).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
            })
        },
        getOrders() {
            axios.get('/order?by=costumer')
            .then(res => {
                this.orders = res.data.body;
            })
        },
        async getOrder() {
            let order = this.orders[this.index];
            await axios.get(`/order/${order.id}`)
            .then(res => {
                this.order = res.data.body;
                this.costumer = res.data.body.costumer.name;
                this.items = res.data.body['items'];
                this.total = 0;
                this.items.forEach(item => {
                    this.total += parseInt(item.price) * parseInt(item.qty);
                })
            })
        },
        async getOutlet() {
            await axios.get(`/outlet`)
            .then(res => {
                this.outlets = res.data.body;
            })
        },
        openModalOrder(index = null) {
            if (index != null)this.index = index;
            this.getOrder();
            $('#modal-show-order').modal('show');
        },
        openModalMenu(index) {
            this.index = index;
            this.outlet = this.outlets[index];
            $('#modal-show-outlet').modal('hide');
            $('#modal-show-menu').modal('show');
        },
        openModalOutlet(index) {
            this.index = index;
            this.getOutlet();
            $('#modal-show-order').modal('hide');
            $('#modal-show-outlet').modal('show');
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
        },
        openAddOrder() {
            $('#modal-add-order').modal('show');
        },
        addOrder() {
            axios.post(`/order/take_away`, this.form_add.form)
            .then(res => {
                if (res.data.status) {
                    $('#modal-add-order').modal('hide');
                    this.orders.push(res.data.body);
                    this.form_add.form.name = '';
                    this.form_add.errors.name = [];
                    Swal.fire('BERHASIL', res.data.message, 'success');
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status != 400) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
                let res = err.response;
                if (res) {
                    if (res.status == 400) {
                        for (const key in res.data[`body`]) {
                            if (Object.hasOwnProperty.call(res.data[`body`], key)) {
                                this.form_add.errors[key] = res.data[`body`][key];
                            }
                        }
                    }
                }
            })
        }
    },
    mounted() {
        this.getOrders();
    }
}
</script>