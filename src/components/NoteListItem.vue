<template>
  <div>
    <template v-if="!isEditing">
      <input
        class="form-check-input"
        type="checkbox"
        v-model="isComplete"
        id="flexCheckDefault"
        style="margin-top: 8px;"
      />
      <label class="form-check-label" style="margin-left: 10px;" for="flexCheckDefault">
        {{ description }}
      </label>
    </template>
    <input v-else v-model="description" type="text" class="note-input" />
      <button
        name="button-edit"
        type="button"
        class="btn btn-sm btn-link"
        style="text-decoration: none; outline: none; font-size: medium; margin-left: 20px;"
        @click="editNote"
      >
        &#9997;
      </button>
      <button
        type="button"
        class="btn btn-sm btn-link"
        style="text-decoration: none; outline: none; font-size: medium;"
        @click="cancel"
      >
        x
      </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: this.note.description,
      isComplete: this.note.isComplete,
      beforeEdit: this.note.description,
      isEditing: false,
    };
  },
  props: {
    note: {
      type: Object,
    },
  },
  methods: {
    editNote() {
      if (this.isEditing) {
        this.isEditing = false;
        const updates = {
          id: this.note['.key'],
          isComplete: this.isComplete,
          description: this.description
        }
        this.$store.dispatch('updateNote', updates)
      } else this.isEditing = true;
      this.beforeEdit = this.description;
    },
    cancel() {
      if (this.isEditing) {
        this.description = this.beforeEdit;
        this.isEditing = false;
      } else
      this.$emit('delete-note', this.note['.key'])
    },
  },
};
</script>

<style scoped>
.note-input {
  border: 0;
  border-bottom: 2px solid #f8f9fa;
  /* border-color: transparent; */
  background: transparent;
  outline: none;
  width: 400px;
  color: white;
}
</style>