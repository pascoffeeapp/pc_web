<template>
    <div id="content">
        <!-- <img src="assets/coffee_content.svg" alt=""> -->
        <div class="container py-3">
            <h1>Tables</h1>

            <div class="rounded shadow-sm p-3 bg-white">

                <div class="container mb-2">
                    <div class="row row-cols-2">
                        <div class="col-sm-7">
                            <!-- + Add Button -->
                            <button type="button" class="btn btn-success" @click="openAddTable">
                                <i class="fa fa-plus"></i> Add
                            </button>

                        </div>
                        <div class="col-sm-3 ms-auto">
                            <form class="d-flex" role="search">
                                <input class="form-control me-2 " type="search" placeholder="Search" aria-label="Search">
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>

                <!--Table content-->
                <table class="table table-bordered ">
                    <thead class="table-light">
                        <tr>
                            <th style="width:3%" class="col-sm-2 text-center">#</th>
                            <th class="col-sm-2">Code Table</th>
                            <th class="col-sm-2 text-center">Edit</th>
                            <th class="col-sm-2 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(v, i) in tables" :key="i">
                            <td class="text-center">{{ i+1 }}</td>
                            <td>{{ v.code }}</td>
                            <td>
                                <button type="button" @click="openEditTable(i)" class="btn btn-sm w-100 btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModa2">
                                    <i class="fa fa-solid fa-pen-to-square"></i>
                                </button>
                            </td>
                            <td>
                                <button type="button" @click="deleteTable(i)" class="btn btn-sm w-100 btn-danger">
                                    <i class="fa fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal Add Table -->
        <div class="modal fade" id="modalAddTable" tabindex="-1" aria-labelledby="modalAddTableLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalAddTableLabel">Add Table</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Table Code:</b></label>
                            <input type="email" class="form-control" placeholder="Type here..." v-model="form_add.form.code">
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.code" :key="i">{{ v }}</div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="addTable">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Edit Table -->
        <div class="modal fade" id="modalEditTable" tabindex="-1" aria-labelledby="modalEditTablelLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalEditTablelLabe">Edit Table</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
    
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Code: </b></label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Type here" v-model="form_edit.form.code">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.code" :key="i">{{ v }}</div>
                        </div>
    
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="updateTable">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    data() {
        return {
            tables: [],
            form_add : {
                form: {
                    code: ''
                },
                errors: {
                    code: []
                },
            },
            form_edit: {
                index: null,
                form: {
                    code: ''
                },
                errors: {
                    code: []
                },
            },
        }
    },
    methods: {
        addTable() {
            axios.post('/table', this.form_add.form)
            .then(res => {
                let data = res.data;
                if (data.status) {
                    Swal.fire(
                        'Success',
                        data.message,
                        'success'
                    ).then((res2) => {
                        this.form_add.form.code = '';
                        this.tables.push(data['body']);
                        $('#modalAddTable').modal('hide');
                    })
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status != 400) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
                if (err) {
                    let data = err.response.data;
                    if (err.response.status == 400) {
                        for (const key in this.form_add.errors) {
                            this.form_add.errors[key] = data.body[key];
                        }
                    }
                }
            })
        },
        openAddTable() {
            $(`#modalAddTable`).modal(`show`);
        },
        getData() {
            axios.get('/table')
            .then(res => {
                let data = res.data;
                if (data.status) {
                    this.tables = data.body;
                }
                // if (res.s)
            })
        },
        deleteTable(index) {
            let table = this.tables[index];
            Swal.fire({
                title: 'Apakah anda yakin ingin menghapus?',
                showDenyButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/table/${table.id}`)
                    .then(res => {
                        let data = res.data;
                        if (data.status) {
                            Swal.fire('Deleted!', data.message, 'success')
                            this.tables.splice(index, 1);
                        }
                    })
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
        openEditTable(index) {
            this.form_edit.index = index;
            this.form_edit.form.code = this.tables[index].code;
            $('#modalEditTable').modal('show');
        },
        updateTable() {
            if (this.form_edit.index != null) {
                let index = this.form_edit.index;
                let table = this.tables[index];
                $('#modalEditTable').modal('hide');
                axios.post('/table/'+table.id, this.form_edit.form)
                .then(res => {
                    let data = res.data;
                    if (data.status) {
                        Swal.fire(
                            'Success',
                            data.message,
                            'success'
                        ).then((res2) => {
                            this.tables[index] = data.body;
                            this.form_edit.form.code = '';
                            this.form_edit.index = null;
                        })
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status != 400) {
                            Swal.fire('GAGAL', err.response.data.message, 'error')
                        }
                    }
                    if (err) {
                        let data = err.response.data;
                        if (err.response.status == 400) {
                            for (const key in this.form_edit.errors) {
                                this.form_edit.errors[key] = data.body[key];
                            }
                        }
                    }
                })   
            }
        }
    },
    mounted() {
        this.getData()
    },
}
</script>