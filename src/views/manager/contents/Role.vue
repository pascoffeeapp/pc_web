<template>
    <!-- <img src="assets/coffee_content.svg" alt=""> -->
    <div class="container py-3">
        <h1>Role</h1>
            
        <div class="rounded shadow-sm p-3 bg-white">

            <div class="container mb-2">
                <div class="row row-cols-2">
                    <div class="col-sm-7"><!-- + Add Button -->
                        <button type="button" class="btn btn-success" @click="openAddRole">
                            + Add
                        </button>
                        
                        <div class="modal fade" id="modalAddRole" tabindex="-1" aria-labelledby="modalAddRoleLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="modalAddRoleLabel">Tambah Peran</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            
                                            <div class="mb-3">
                                                <label for="name" class="form-label"><b>Name :</b></label>
                                                <input type="text" class="form-control" v-model="form_add.form.name" id="name" placeholder="name">
                                                <div class="small text-danger" v-for="(v, i) in form_add.errors.name">{{v}}</div>
                                            </div>
                                            
                                            <div class="mb-2"><b>Permissions:</b></div>
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Kunci</th>
                                                        <th>Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(v, i) in permissions" :key="i">
                                                        <td>
                                                            <input type="checkbox" :value="v.id" v-model="form_add.form.permissions">
                                                        </td>
                                                        <td>
                                                            {{v.key}}
                                                        </td>
                                                        <td>
                                                            {{v.description}}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="small text-danger" v-for="(v, i) in form_add.errors.permissions">{{v}}</div>
                                        </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-success" @click="addRole">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 ms-auto">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
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
                        <th class="col-sm-5">Name</th>
                        <th class="col-sm-2">Edit</th>
                        <th class="col-sm-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" v-if="roles.length == 0" class="text-center">Data Kosong</td>
                    </tr>
                    <tr v-for="(v, i) in roles" :key="i">
                        <th scope="row">{{ i+1 }}</th>
                        <th scope="row">{{ v.name }}</th>
                        <td>
                            <button type="button" :disabled="v.id == user.role_id" class="btn btn-warning w-100" @click="openEditRole(i)">
                                <i class="fa fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                        <td>
                            <button type="button" :disabled="v.id == user.role_id" class="btn btn-danger w-100" @click="deleteRole(i)">
                                <i class="fa fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="modal fade" id="modalEditRole" tabindex="-1" aria-labelledby="modalEditRoleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalEditRoleLabel">Edit Peran</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div class="modal-body">
                            
                            <div class="mb-3">
                                <label for="name" class="form-label"><b>Nama :</b></label>
                                <input type="text" class="form-control" v-model="form_edit.form.name" id="name" placeholder="name">
                                <div class="small text-danger" v-for="(v, i) in form_edit.errors.name">{{v}}</div>
                            </div>
                            
                            <div class="mb-2"><b>Permissions:</b></div>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Kunci</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(v, i) in form_edit.permissions" :key="i">
                                        <td>
                                            <input type="checkbox" :value="v.id" :checked="v.checked" ref="permissions">
                                        </td>
                                        <td>
                                            {{v.key}}
                                        </td>
                                        <td>
                                            {{v.description}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="small text-danger" v-for="(v, i) in form_edit.errors.permissions">{{v}}</div>
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="updateRole">Submit</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    props: {
        user: Object,
    },
    data() {
        return {
            roles: [],
            permissions: [],
            form_add: {
                form: {
                    name: ``,
                    permissions: [],
                },
                errors: {
                    name: [],
                    permissions: [],
                },
            },
            form_edit: {
                index: null,
                permissions: [],
                form: {
                    name: ``,
                    permissions: [],
                },
                errors: {
                    name: [],
                    permissions: [],
                },
            },
        }
    },
    methods: {
        async getPermissions() {
            await axios.get(`/permission`)
            .then(res => {
                if (res.data[`status`]) {
                    this.permissions = res.data[`data`];
                }
            })
        },
        getPermissionsForEdit() {
            let role = this.roles[this.form_edit.index];
            this.form_edit.permissions = this.permissions.slice();
            this.form_edit.permissions.forEach(perm => {
                perm.checked = false;
                role.permissions.forEach(perm2 => {
                    if (perm.id == perm2.id) perm.checked = true;
                })
            })
            
        },
        getRoles() {
            axios.get(`/role`)
            .then(res => {
                if (res.data[`status`]) {
                    this.roles = res.data[`body`];
                }
            })
        },
        openAddRole() {
            this.getPermissions();
            $(`#modalAddRole`).modal(`show`);
        },
        async openEditRole(index) {
            let role = this.roles[index];
            await this.getPermissions();
            this.form_edit.index = index;
            this.form_edit.form.name = role.name;
            $(`#modalEditRole`).modal(`show`);
            this.getPermissionsForEdit();
        },
        addRole() {
            axios.post(`/role`, this.form_add.form)
            .then(res => {
                if (res.data[`status`]) {
                    Swal.fire('BERHASIL!', res.data.message, 'success')
                    .then(() => {
                        $(`#modalAddRole`).modal(`hide`);
                        this.roles.push(res.data[`body`]);
                        this.form_add.form = {
                            name: ``,
                            permissions: [],
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
                let res = err.response;
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
        updateRole() {
            let role = this.roles[this.form_edit.index];
            this.$refs.permissions.forEach(perm => {
                if (perm.checked) this.form_edit.form.permissions.push(perm.value);
            })
            axios.post(`/role/${role.id}`, this.form_edit.form)
            .then(res => {
                if (res.data[`status`]) {
                    Swal.fire('BERHASIL!', res.data.message, 'success')
                    .then(() => {
                        $(`#modalEditRole`).modal(`hide`);

                        this.roles[this.form_edit.index] = res.data['body'];
                        
                        this.form_edit.form = {
                            name: ``,
                            permissions: [],
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
                let res = err.response;
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
        deleteRole(index) {
            let role = this.roles[index];
            Swal.fire({
                title: 'Apakah anda yakin ingin menghapus?',
                showDenyButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/role/${role.id}`)
                    .then(res => {
                        let data = res.data;
                        if (data.status) {
                            Swal.fire('BERHASIL!', data.message, 'success')
                            .then(() => {
                                this.roles.splice(index, 1);
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
        this.getRoles();
    },
}
</script>