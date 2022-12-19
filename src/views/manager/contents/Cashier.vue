<template>
    <div class="container py-3">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-12">
                <div :class="`box-table active ${v.status ? 'active' : ''}`" v-for="(v, i) in tables" :key="i" @click="openModalOrder(i)">
                    <div class="name text-uppercase">{{ v.code }}</div>
                    <div class="text">{{ v.status ? 'RESERVED' : 'FREE'}}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Show Order -->
    <div class="modal fade" id="modal-show-order" tabindex="-1" aria-labelledby="modal-show-orderLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-show-orderLabel">Order</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tables: [],
            index: null,
        }
    },
    methods: {
        getTables() {
            axios.get('/table')
            .then(res => {
                if (res.data.status) {
                    this.tables = res.data.body;
                }
            })
        },
        async getOrder() {
            let table = this.tables[this.index];
            await axios.get(`/table/${table.id}/order`)
            .then(res => {
                console.log(res.data.body);
            })
        },
        openModalOrder(index) {
            this.index = index;
            this.getOrder();
            $('#modal-show-order').modal('show');
        }
    },
    mounted() {
        this.getTables();
    }
}
</script>