<template>
    <div class="modal fade" id="AddTable" tabindex="-1" aria-labelledby="AddTableLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="AddTableLabel">Add Table</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label"><b>Table Code:</b></label>
                        <input type="email" class="form-control" placeholder="Type here..." v-model="form.code">
                        <div class="small text-danger" v-for="(v, i) in errors.code" :key="i">{{ v }}</div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" @click="add">Submit</button>
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
            form: {
                code: ''
            },
            errors: {
                code: []
            },
        }
    },
    methods: {
        add() {
            axios.post('/table', this.form)
            .then(res => {
                let data = res.data;
                if (data.status) {
                    Swal.fire(
                        'Success',
                        data.message,
                        'success'
                    ).then((res2) => {
                        this.form.code = '';
                        this.$emit('success', data.body);
                        $('#AddTable').modal('hide');
                    })
                }
            })
            .catch(err => {
                if (err) {
                    let data = err.response.data;
                    if (err.response.status == 403) {
                        for (const key in this.errors) {
                            this.errors[key] = data.body[key];
                        }
                    }
                }
            })
        },
    }
}
</script>