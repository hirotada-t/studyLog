<template>
  <q-card
    class="bg-dark"
    flat
    style="border: 2px solid #888; margin-top: 140px"
  >
    <q-card-section align="center">
      <q-btn
        target="_blank"
        :href="url"
        flat
        label="share on twitter"
        icon="ios_share"
        color="primary"
      />
      <q-scroll-area
        :thumb-style="{
          right: '2px',
          borderRadius: '5px',
          backgroundColor: '#cccccc',
          width: '5px',
          opacity: '0.4',
        }"
        dark
        visible
        class="q-pt-sm"
        :class="Screen.height > 777 ? '' : 'q-pr-md'"
        :style="Screen.height > 777 ? { height: '450px' } : { height: '350px' }"
      >
        <q-form class="q-gutter-y-md column">
          <q-input
            dark
            filled
            v-model="logOfWork.title"
            label="Title"
            counter
            dense
            clearable
            maxlength="20"
          >
            <template v-slot:prepend>
              <q-icon name="edit" size="small" />
            </template>
          </q-input>
          <q-select
            clearable
            label="Category"
            dark
            filled
            v-model="logOfWork.category"
            :options="categoryList"
            dense
          >
          </q-select>
          <q-btn
            size="small"
            flat
            dense
            class="q-mt-none q-py-none"
            label="add new category"
            icon="add"
            @click="addNewCat = true"
          >
            <q-dialog v-model="addNewCat">
              <q-card class="bg-dark" flat>
                <q-card-section align="center">
                  <q-input
                    v-model="newCat"
                    label="new category"
                    dark
                    filled
                    dense
                    clearable
                  />
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn
                    @click="addNewCat = false"
                    flat
                    label="cancel"
                    color="primary"
                  />
                  <q-btn
                    @click="
                      categoryList.push(newCat);
                      addNewCat = false;
                      newCat = '';
                    "
                    :disable="newCat === ''"
                    flat
                    label="OK"
                    color="dark"
                    class="bg-primary text-bold"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-btn>
          <q-select
            label="Tags"
            dark
            filled
            v-model="logOfWork.tagList"
            use-input
            use-chips
            multiple
            dense
            hide-dropdown-icon
            new-value-mode="add-unique"
          >
            <template v-slot:prepend>
              <q-icon name="local_offer" size="small" />
            </template>
          </q-select>
          <p class="text-left q-mb-none">Level of Focus</p>
          <q-item class="q-mt-none q-pa-none">
            <q-item-section side class="align-end">
              <q-icon
                @click="logOfWork.focusLevel < 2 ? 1 : logOfWork.focusLevel--"
                name="remove"
                size="xs"
              />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="logOfWork.focusLevel"
                color="accent"
                thumb-color="grey-4"
                snap
                dark
                :min="1"
                :max="4"
                :step="1"
                marker-labels
                label-always
                :label-value="faceOfFocus[logOfWork.focusLevel - 1]"
                :switch-label-side="logOfWork.focusLevel === 1"
                track-size="10px"
                thumb-size="25px"
                markers
              >
                <template v-slot:marker-label-group="{ markerMap }">
                  <div
                    class="row items-center no-wrap justify-center"
                    :class="markerMap[logOfWork.focusLevel].classes"
                    style="width: 100%; transform: translateX(0)"
                  >
                    <span class="q-mr-xs">Score :</span>
                    <q-rating
                      v-model="logOfWork.focusLevel"
                      :max="4"
                      size="1em"
                      color="accent"
                      icon="star_border"
                      icon-selected="star"
                    />
                  </div>
                </template>
              </q-slider>
            </q-item-section>
            <q-item-section side>
              <q-icon
                @click="logOfWork.focusLevel > 3 ? 4 : logOfWork.focusLevel++"
                name="add"
                size="xs"
              />
            </q-item-section>
          </q-item>
          <q-input
            label="Study contents"
            dark
            filled
            v-model="logOfWork.studyContents"
            dense
            type="textarea"
          />
        </q-form>
      </q-scroll-area>
    </q-card-section>
    <q-card-actions align="center" class="q-pb-md">
      <RestartFinish
        v-if="route.name === 'Timer'"
        @set-content="store.setLog(logOfWork)"
      />
      <CancelUpdate
        v-if="route.name === 'Daily Journal'"
        @update-content="store.setLog(logOfWork)"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { Screen } from 'quasar';
import CancelUpdate from 'src/components/parts/dialogBtns/CancelUpdate.vue';
import { useLogStore } from 'src/store/logStore';
import { DailyLog } from 'src/types/util.interface';
import { ref } from 'vue';
import RestartFinish from 'src/components/parts/dialogBtns/RestartFinish.vue';
import { useRoute } from 'vue-router';

const faceOfFocus = ['😣', '😑', '🙂', '😆'];
const store = useLogStore();
const route = useRoute();
const props = defineProps<{ url: string }>();
const categoryList = ref<string[]>(['MySelf', 'Task']);
const newCat = ref<string>('');
const addNewCat = ref<boolean>(false);
const url = ref<string>(props.url);
const logOfWork = ref<DailyLog>({
  startMS: Date.now(),
  studyMS: 0,
  title: '',
  category: '',
  tagList: [],
  focusLevel: 3,
  studyContents: '',
});
</script>
