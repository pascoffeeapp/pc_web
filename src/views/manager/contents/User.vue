<template>
    <div id="content">
        <!-- <img src="assets/coffee_content.svg" alt=""> -->
        <div class="container py-3">
            <h1>User</h1>
                
            <div class="rounded shadow-sm p-3 bg-white">

                <div class="container mb-2">
                    <div class="row row-cols-2">
                        <div class="col-sm-7"><!-- + Add Button -->
                                <button type="button" class="btn btn-success" @click="openAddUser">
                                    <i class="fa fa-plus"></i> Add
                                </button>
                                
                                <!-- Modal -->
                                <div class="modal fade" id="AddUser" tabindex="-1" aria-labelledby="AddUserLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="AddUserLabel">Add User</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label"><b>Username :</b></label>
                                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Name or username" v-model="form_add.form.username">
                                                    <div class="small text-danger" v-for="(v, i) in form_add.errors.username" :key="i">{{ v }}</div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label"><b>Password :</b></label>
                                                    <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="form_add.form.password">
                                                    <div class="small text-danger" v-for="(v, i) in form_add.errors.password" :key="i">{{ v }}</div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label"><b>Comfirm Password :</b></label>
                                                    <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="form_add.form.confirm_password">
                                                    <div class="small text-danger" v-for="(v, i) in form_add.errors.confirm_password" :key="i">{{ v }}</div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label"><b>Role :</b></label>
                                                    <select class="form-select form-select mb-3" v-model="form_add.form.role_id" aria-label="form-select">
                                                        <option value="" selected>Select Role</option>
                                                        <option v-for="(v, i) in roles" :key="i" :value="v.id">{{ v.name }}</option>
                                                    </select>
                                                    <div class="small text-danger" v-for="(v, i) in form_add.errors.role_id" :key="i">{{ v }}</div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-success" @click="addUser">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        <th class="col-sm-5">Name</th>
                        <th class="col-sm-5">Role</th>
                        <th class="col-sm-2 text-center">Edit</th>
                        <th class="col-sm-2 text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in users">
                        <th class="text-center" scope="row">{{ i+1 }}</th>
                        <th scope="row">{{ v.username }}</th>
                        <th scope="row">{{ v.role.name }}</th>
                        <td>
                            <button type="button" :disabled="v.id == user.id" class="btn btn-warning w-100 btn-sm" @click="openEditUser(i)">
                                <i class="fa fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                        <td>
                            <button type="button" :disabled="v.id == user.id" class="btn btn-danger w-100 btn-sm" @click="deleteUser(i)">
                                <i class="fa fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
            </div>
        </div>
        <div class="modal fade" id="EditUser" tabindex="-1" aria-labelledby="EditUserLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="EditUser">Edit user</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">   
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Username :</b></label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Name or username" v-model="form_edit.form.username">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.username" :key="i">{{ v }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Password :</b></label>
                            <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="form_edit.form.password">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.password" :key="i">{{ v }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Comfirm Password :</b></label>
                            <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="form_edit.form.confirm_password">
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.confirm_password" :key="i">{{ v }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label"><b>Role :</b></label>
                            <select class="form-select form-select mb-3" v-model="form_edit.form.role_id" aria-label="form-select">
                                <option value="" selected>Select Role</option>
                                <option v-for="(v, i) in roles" :key="i" :value="v.id">{{ v.name }}</option>
                            </select>
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.role_id" :key="i">{{ v }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="updateUser">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    props: {
        user: Object,
    },
    data() {
        return {
            users: [],
            roles: [],
            form_add: {
                form: {
                    username: '',
                    password: '',
                    confirm_password: '',
                    role_id: '',
                },
                errors: {
                    username: '',
                    password: '',
                    confirm_password: '',
                    role_id: '',
                },
            },
            form_edit: {
                index: null,
                form: {
                    username: '',
                    password: '',
                    confirm_password: '',
                    role_id: '',
                },
                errors: {
                    username: '',
                    password: '',
                    confirm_password: '',
                    role_id: '',
                },
            },
        }
    },
    methods: {
        addUser(data) {
            axios.post('/user', this.form_add.form)
            .then(res => {
                let data = res.data;
                if (data.status) {
                    Swal.fire(
                        'Success',
                        data.message,
                        'success'
                    ).then((res2) => {
                        this.form_add.form.username = '';
                        this.form_add.form.password = '';
                        this.form_add.form.confirm_password = '';
                        this.users.push(data.body);
                        $('#AddUser').modal('hide');
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
                        for (const key in this.errors) {
                            this.form_add.errors[key] = data.body[key];
                        }
                    }
                }
            })
        },
        getRoles() {
            axios.get('/role')
            .then(res => {
                let data = res.data;
                if (data.status) {
                    this.roles = data.body;
                }
            })
        },
        getData() {
            axios.get('/user')
            .then(res => {
                let data = res.data;
                if (data.status) {
                    this.users = data.body;
                }
            })
        },
        deleteUser(index) {
            let user = this.users[index];
            Swal.fire({
                title: 'Do you want to delete it?',
                showDenyButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/user/${user.id}`)
                    .then(res => {
                        let data = res.data;
                        if (data.status) {
                            Swal.fire('Deleted!', data.message, 'success')
                            this.users.splice(index, 1);
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
        openAddUser() {
            this.getRoles();
            $('#AddUser').modal('show');
        },
        openEditUser(index) {
            this.getRoles();
            this.form_edit.index = index;
            let user = this.users[index];
            this.form_edit.form.username = user.username;
            this.form_edit.form.role_id = user.role.id;
            $('#EditUser').modal('show');
        },
        updateUser() {
            if (this.form_edit.index != null) {
                let index = this.form_edit.index;
                let user = this.users[index];
                axios.post('/user/'+user.id, this.form_edit.form)
                .then(res => {
                    let data = res.data;
                    if (data.status) {
                        Swal.fire(
                            'Success',
                            data.message,
                            'success'
                        ).then((res2) => {
                            this.users[index] = data.body;
                            this.form_edit.form.username = '';
                            this.form_edit.form.password = '';
                            this.form_edit.form.confirm_password = '';
                            $('#EditUser').modal('hide');
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
                            for (const key in this.errors) {
                                this.form_edit.errors[key] = data.body[key];
                            }
                        }
                    }
                })   
            }
        }
    },
    mounted() {
        this.getData();
    },
}
</script>