<template>
    <div id="content">
        <!-- <img src="assets/coffee_content.svg" alt=""> -->
        <div class="container py-3">
            <h1>Outlet</h1>
                
            <div class="rounded shadow-sm p-3 bg-white">

                <div class="container mb-2">
                    <div class="row row-cols-2">
                        <div class="col-sm-7"><!-- + Add Button -->
                            <button type="button" class="btn btn-success" @click="openAddOutlet">
                                + Add Outlet
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
                <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th class="col-sm-1">#</th>
                        <th class="col-sm-3">Name</th>
                        <th class="col-sm-4">Owner</th>
                        <th class="col-sm-1">Picture</th>
                        <th class="col-sm-1">Edit</th>
                        <th class="col-sm-1">Delete</th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr v-for="(v, i) in outlets" :key="i">
                        <th scope="row">{{ i+1 }}</th>
                        <th>{{ v.name }}</th>
                        <th>{{ v.owner.username }}</th>
                        <th>
                            <a :href="`http://localhost:8000/uploads/${v.image}`" target="_blank" class="btn btn-success w-100" rel="noopener noreferrer">
                                <i class="fa fa-image"></i>
                            </a>
                        </th>
                        <td>
                            <div class="d-grid gap-2 mx-auto">
                                <button type="button" class="btn btn-warning" @click="openEditOutlet(i)">
                                    <i class="fa fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                                                           
                        </td>
                        <td>
                            <div class="d-grid gap-2 mx-auto">
                                <button type="button" class="btn btn-danger" @click="deleteOutlet(i)">
                                    <i class="fa fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
            </div>
        </div>

        <!-- Modal Add Outlet -->
        <div class="modal fade" id="modal-add-outlet" tabindex="-1" aria-labelledby="modal-add-outletLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modal-add-outletLabel">Add Outlet</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Outlet Name :</b></label>
                            <input type="username" class="form-control" id="exampleFormControlInput1" placeholder="Outlet name" v-model="form_add.form.name">
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.name" :key="i">{{ v }}</div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label"><b>Description :</b></label>
                            <br><textarea class="form-control" id="exampleFormControlInput2" placeholder="Description" v-model="form_add.form.description"></textarea>
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.description" :key="i">{{ v }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label"><b>Owner :</b></label>
                            <select class="form-select form-select mb-3" v-model="form_add.form.owner_id" aria-label="form-select">
                                <option value="" selected>Select Role</option>
                                <option v-for="(v, i) in users" :key="i" :value="v.id">{{ v.username }}</option>
                            </select>
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.owner_id" :key="i">{{ v }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label"><b>Picture :</b></label>
                            <input class="form-control" type="file" ref="add_picture" id="formFile">
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.image" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="addOutlet">Submit</button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Modal Edit Outlet -->
        <div class="modal fade" id="modal-edit-outlet" tabindex="-1" aria-labelledby="modal-edit-outletLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modal-edit-outletLabel">Edit Outlet</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Outlet Name :</b></label>
                            <input type="username" class="form-control" id="exampleFormControlInput1" placeholder="Outlet name" v-model="form_edit.form.name">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.name" :key="i">{{ v }}</div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label"><b>Description :</b></label>
                            <br><textarea class="form-control" id="exampleFormControlInput2" placeholder="Description" v-model="form_edit.form.description"></textarea>
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.description" :key="i">{{ v }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label"><b>Owner :</b></label>
                            <select class="form-select form-select mb-3" v-model="form_edit.form.owner_id" aria-label="form-select">
                                <option value="" selected>Select Role</option>
                                <option v-for="(v, i) in users" :key="i" :value="v.id">{{ v.username }}</option>
                            </select>
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.owner_id" :key="i">{{ v }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label"><b>Picture :</b></label>
                            <input class="form-control" type="file" ref="edit_picture" id="formFile">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.image" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="updateOutlet">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            baseUrl: '',
            outlets: [],
            users: [],
            form_add: {
                form: {
                    name: '',
                    description: '',
                    owner_id: '',
                    image: '',
                },
                errors: {
                    name: [],
                    description: [],
                    owner_id: [],
                    image: [],
                },
            },
            form_edit: {
                index: null,
                form: {
                    name: '',
                    description: '',
                    owner_id: '',
                    image: '',
                },
                errors: {
                    name: [],
                    description: [],
                    owner_id: [],
                    image: [],
                },
            },
        }
    },
    methods: {
        openAddOutlet() {
            this.loadUsers();
            $('#modal-add-outlet').modal('show');
        },
        openEditOutlet(index) {
            this.form_edit.index = index;
            let outlet = this.outlets[index];
            for (const key in this.form_edit.form) {
                this.form_edit.form[key] = outlet[key]
            }
            this.loadUsers();
            $('#modal-edit-outlet').modal('show');
        },
        loadUsers() {
            Axios.get('/user')
            .then((res) => {
                if (res.data.status) {
                    this.users = res.data.body;
                }
            })
        },
        loadOutlets() {
            Axios.get('/outlet')
            .then((res) => {
                if (res.data.status) {
                    this.outlets = res.data.body;
                }
            })
        },
        getFormData(data) {
            let fd = new FormData();
            for (const key in data) {
                const v = data[key];
                fd.append(key, v);
            }
            return fd;
        },
        addOutlet() {
            this.form_add.form.image = this.$refs.add_picture.files[0];
            Axios.post(`/outlet`, this.getFormData(this.form_add.form), {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                if (res.data.status) {
                    $('#modal-add-outlet').modal('hide');
                    this.outlets.push(res.data.body);
                    this.form_add.form = {
                        name: '',
                        description: '',
                        owner_id: '',
                        image: '',
                    };
                    Swal.fire('BERHASIL', res.data.message, 'success')
                }
            })
            .catch(err => {
                let res = err.response;
                if (err.response) {
                    if (err.response.status != 403) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
                if (res) {
                    if (res.status == 403) {
                        for (const key in res.data[`body`]) {
                            if (Object.hasOwnProperty.call(res.data[`body`], key)) {
                                this.form_add.errors[key] = res.data[`body`][key];
                            }
                        }
                    }
                }
            })
        },
        updateOutlet() {
            let outlet = this.outlets[this.form_edit.index];
            this.form_edit.form.image = this.$refs.edit_picture.files[0];
            Axios.post(`/outlet/${outlet.id}`, this.getFormData(this.form_edit.form), {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                if (res.data.status) {
                    $('#modal-edit-outlet').modal('hide');
                    this.outlets[this.form_edit.index] = res.data.body;
                    this.form_edit.form = {
                        name: '',
                        description: '',
                        owner_id: '',
                        image: '',
                    };
                    Swal.fire('BERHASIL', res.data.message, 'success')
                }
            })
            .catch(err => {
                let res = err.response;
                if (err.response) {
                    if (err.response.status != 403) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
                if (res) {
                    if (res.status == 403) {
                        for (const key in res.data[`body`]) {
                            if (Object.hasOwnProperty.call(res.data[`body`], key)) {
                                this.form_edit.errors[key] = res.data[`body`][key];
                            }
                        }
                    }
                }
            })
        },
        deleteOutlet(index) {
            let outlet = this.outlets[index];
            Swal.fire({
                title: 'Apakah anda yakin ingin menghapus?',
                showDenyButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    Axios.delete(`/outlet/${outlet.id}`)
                    .then(res => {
                        let data = res.data;
                        if (data.status) {
                            Swal.fire('BERHASIL!', data.message, 'success')
                            .then(() => {
                                this.outlets.splice(index, 1);
                            })
                        }
                    })
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status != 403) {
                        Swal.fire('GAGAL', err.response.data.message, 'error')
                    }
                }
            })
        }
    },
    mounted() {
        this.loadOutlets();
        this.baseUrl = Axios.defaults.baseURL;
    }
}
</script>