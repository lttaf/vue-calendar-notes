<template>
  <div>
    <div class="centered container">
      <Calendar :attributes="attributes" @dayclick="dayClicked" isExpanded />
    </div>
    <div v-if="showDayCard" class="centered">
      <div class="card text-white bg-secondary mb-3 day-card">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedDay.date.toDateString() }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="this.showDayCard = false"
          >
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div class="card-body" style="overflow: auto">
          <NoteListItem
            v-for="note in notesByDate"
            :key="note['.key']"
            :note="note"
            @delete-note="deleteNote"
          />
          <template v-if="isWritingNote">
            <input v-model="description" type="text" class="note-input" />
            <div style="float: right">
              <button
                name="button-edit"
                type="button"
                class="btn btn-sm btn-link"
                style="text-decoration: none; outline: none; font-size: medium"
                @click="addNote"
              >
                &#9997;
              </button>
              <button
                type="button"
                class="btn btn-sm btn-link"
                style="text-decoration: none; outline: none; font-size: medium"
                @click="cancel"
              >
                x
              </button>
            </div>
          </template>
        </div>
        <div class="modal-footer" style="min-height: 50px">
          <button
            type="button"
            class="btn btn-sm btn-link"
            style="text-decoration: none; outline: none; font-size: medium; position: fixed"
            :disabled="isWritingNote"
            @click.prevent="isWritingNote = true"
          >
            + add note
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar } from "v-calendar";
import NoteListItem from "@/components/NoteListItem";

export default {
  components: {
    Calendar,
    NoteListItem,
  },
  data() {
    return {
      isWritingNote: false,
      description: "",
      selectedDay: null,
      showDayCard: false,
    };
  },
  props: {
    calendarId: String,
  },
  computed: {
    notes() {
      const notes = this.$store.state.notes;
      return Object.values(notes).filter(n => n.calendarId === this.calendarId)
    },
    attributes() {
      return [
        ...this.notes.map((note) => ({
          dates: note.dates,
          dot: {
            color: note.color,
            class: note.isComplete ? "opacity-75" : "",
          },
          popover: {
            label: note.description,
          },
          customData: note,
        })),
      ];
    },
    notesByDate() {
      return this.notes.filter(
        (note) => {
         if (new Date(note.dates).getTime() === this.selectedDay.date.getTime()) return note
        }
      );
    },
  },
  methods: {
    dayClicked(day) {
      this.selectedDay = day;
      this.showDayCard = true;
    },
    addNote() {
      if (this.description.length === 0) return;
      const date = this.selectedDay.date
      const note = {
        calendarId: this.calendarId,
        description: this.description,
        isComplete: false,
        dates: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
 date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()),
        color: "red",
      }
      this.$store.dispatch('createNote', { note })
      this.isWritingNote = false;
      this.description = "";
    },
    deleteNote(key) {
      this.$store.dispatch('deleteNote', { noteId: key })
    },
    cancel() {
      this.description = "";
      this.isWritingNote = false;
    },
  },
};
</script>

<style scoped>
.vc-arrow {
  color: #35383c;
}
.vc-container {
  background-color: transparent;
  border: transparent;
}
.centered {
  position: absolute;
  left: 50%;
  top: 50%;
  /* top: 70%; */
  transform: translate(-50%, -50%);
}
.day-card {
  width: 40rem;
  height: 25rem;
}
.container {
  width: 600px;
  /* width: 400px; */
  /* height: 900px; */
}
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