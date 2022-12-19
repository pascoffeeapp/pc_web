<template>
    <div id="content" v-if="outlet != null">
        <!-- <img src="assets/coffee_content.svg" alt=""> -->
        <div class="container py-3">
            <h1>Menu</h1>
                
            <div class="rounded shadow-sm p-3 bg-white">

                <div class="container mb-2">
                    <div class="row row-cols-2">
                        <div class="col-sm-7"><!-- + Add Button -->
                            <button type="button" class="btn btn-success" @click="openAddMenu">
                                <i class="fa fa-plus"></i> Add Menu
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
                    <thead class="table-light">
                      <tr>
                        <th class="col-sm-1 text-center">#</th>
                        <th class="col-sm-3">Name</th>
                        <th class="col-sm-4">Price</th>
                        <th class="col-sm-1 text-center">Status</th>
                        <th class="col-sm-1 text-center">Picture</th>
                        <th class="col-sm-1 text-center">Edit</th>
                        <th class="col-sm-1 text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr v-for="(v, i) in menu" :key="i">
                        <th class="text-center" scope="row">{{ i+1 }}</th>
                        <th>{{ v.name }}</th>
                        <th>{{ formatCurrency(v.price) }}</th>
                        <th>{{ (v.status == 1) ? 'Available' : 'Unavailable' }}</th>
                        <th>
                            <a :href="`http://localhost:8000/uploads/${v.image}`" target="_blank" class="btn btn-success w-100" rel="noopener noreferrer">
                                <i class="fa fa-image"></i>
                            </a>
                        </th>
                        <td>
                            <div class="d-grid gap-2 mx-auto">
                                <button type="button" class="btn btn-warning" @click="openEditMenu(i)">
                                    <i class="fa fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                                                           
                        </td>
                        <td>
                            <div class="d-grid gap-2 mx-auto">
                                <button type="button" class="btn btn-danger" @click="deleteMenu(i)">
                                    <i class="fa fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
            </div>
        </div>

        <!-- Modal Add Menu -->
        <div class="modal fade" id="modal-add-menu" tabindex="-1" aria-labelledby="modal-add-menuLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modal-add-menuLabel">Add Menu</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Name :</b></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Name" v-model="form_add.form.name">
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.name" :key="i">{{ v }}</div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label"><b>Description :</b></label>
                            <br><textarea class="form-control" id="exampleFormControlInput2" placeholder="Description" v-model="form_add.form.description"></textarea>
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.description" :key="i">{{ v }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label"><b>Price :</b></label>
                            <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Price" v-model="form_add.form.price">
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.price" :key="i">{{ v }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="formFile" class="form-label"><b>Picture :</b></label>
                            <input class="form-control" type="file" ref="add_picture" id="formFile">
                            <div class="small text-danger" v-for="(v, i) in form_add.errors.image" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="addMenu">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Edit Menu -->
        <div class="modal fade" id="modal-edit-menu" tabindex="-1" aria-labelledby="modal-edit-menuLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modal-edit-menuLabel">Edit Menu</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Menu Name :</b></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Menu name" v-model="form_edit.form.name">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.name" :key="i">{{ v }}</div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="exampleFormControlInput2" class="form-label"><b>Description :</b></label>
                            <br><textarea class="form-control" id="exampleFormControlInput2" placeholder="Description" v-model="form_edit.form.description"></textarea>
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.description" :key="i">{{ v }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label"><b>Price :</b></label>
                            <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Menu name" v-model="form_edit.form.price">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.price" :key="i">{{ v }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput3" class="form-label"><b>Status :</b></label>
                            <select class="form-select" v-model="form_edit.form.status" id="exampleFormControlInput3">
                                <option value="1">Available</option>
                                <option value="0">Unavailable</option>
                            </select>
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.status" :key="i">{{ v }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="formFile" class="form-label"><b>Picture :</b></label>
                            <input class="form-control" type="file" ref="edit_picture" id="formFile">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.image" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="updateMenu">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import Swal from 'sweetalert2';
import { AuthStore } from '../../../stores/Auth';

export default {
    props: {
        user: Object,
    },
    data() {
        return {
            baseUrl: '',
            menu: [],
            outlet: null,
            form_add: {
                form: {
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                },
                errors: {
                    name: [],
                    description: [],
                    price: [],
                    image: [],
                },
            },
            form_edit: {
                index: null,
                form: {
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    status: '',
                },
                errors: {
                    name: [],
                    description: [],
                    price: [],
                    image: [],
                    status: [],
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
        openAddMenu() {
            $('#modal-add-menu').modal('show');
        },
        openEditMenu(index) {
            this.form_edit.index = index;
            let menu = this.menu[index];
            for (const key in this.form_edit.form) {
                this.form_edit.form[key] = menu[key]
            }
            $('#modal-edit-menu').modal('show');
        },
        getFormData(data) {
            let fd = new FormData();
            for (const key in data) {
                const v = data[key];
                fd.append(key, v);
            }
            return fd;
        },
        addMenu() {
            this.form_add.form.image = this.$refs.add_picture.files[0];
            Axios.post(`/outlet/${this.outlet.id}/menu`, this.getFormData(this.form_add.form), {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                if (res.data.status) {
                    $('#modal-add-menu').modal('hide');
                    this.menu.push(res.data.body);
                    this.form_add.form = {
                        name: '',
                        description: '',
                        price: '',
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
                            console.log(res.data[`body`])
                            if (Object.hasOwnProperty.call(res.data[`body`], key)) {
                                this.form_add.errors[key] = res.data[`body`][key];
                            }
                        }
                    }
                }
            })
        },
        updateMenu() {
            let menu = this.menu[this.form_edit.index];
            this.form_edit.form.image = this.$refs.edit_picture.files[0];
            Axios.post(`outlet/${this.outlet.id}/menu/${menu.id}`, this.getFormData(this.form_edit.form), {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                if (res.data.status) {
                    $('#modal-edit-menu').modal('hide');
                    this.menu[this.form_edit.index] = res.data.body;
                    
                    this.menu[this.form_edit.index].status = parseInt(this.menu[this.form_edit.index].status);
                    this.form_edit.form = {
                        name: '',
                        description: '',
                        price: '',
                        image: '',
                        status: '',
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
        deleteMenu(index) {
            let menu = this.menu[index];
            Swal.fire({
                title: 'Apakah anda yakin ingin menghapus?',
                showDenyButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    Axios.delete(`outlet/${this.outlet.id}/menu/${menu.id}`)
                    .then(res => {
                        let data = res.data;
                        if (data.status) {
                            Swal.fire('BERHASIL!', data.message, 'success')
                            .then(() => {
                                this.menu.splice(index, 1);
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
        this.baseUrl = Axios.defaults.baseURL;
        
        Axios.get(`user/${this.$props.user.id}/outlet`)
        .then(res => {
            if (res.data.status) {
                this.outlet = res.data.body;
                this.menu = this.outlet.menu;
            }
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Make sure you have Outlet!',
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: 'Dashboard',
                denyButtonText: `Logout`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.$router.replace({name: 'Dashboard'})
                } else if (result.isDenied) {
                    AuthStore().logout();
                    this.$router.replace({name: 'Login'})
                }
            })
        })
    }
}
</script>