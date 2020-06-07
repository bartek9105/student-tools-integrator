<template>
  <v-container>
    <Breadcrumbs/>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-form @submit.prevent>
            <v-text-field
              label="Offer title"
              filled
              v-model="offer.title"
            ></v-text-field>
            <v-textarea
              filled
              name="input-7-4"
              label="Offer description"
              v-model="offer.description"
            ></v-textarea>
            <v-text-field
              label="Phone number or e-mail"
              filled
              v-model="offer.contact"
            ></v-text-field>
            <v-btn color="primary" @click="editOffer" v-if="editMode">
              Edit offer
            </v-btn>
            <v-btn color="primary" @click="addOffer" v-else>
              Add offer
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <h3 class="mb-8">Offers list</h3>
          <v-card v-for="offer in getOffers" :key="offer._id" class="mb-4">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="d-flex align-center">
                  <v-list-item-title class="mb-4">{{ offer.title }}</v-list-item-title>
                  <span class="caption">{{ offer.createdAt.substr(0, 10) }}</span>
                </div>
                <v-list-item-subtitle class="mb-4">
                  {{ offer.description }}
                </v-list-item-subtitle>
                <div class="d-flex align-center">
                  <v-list-item-subtitle>
                    554 112 332
                  </v-list-item-subtitle>
                  <div class="d-flex">
                    <v-btn color="primary text-white" class="mr-2" @click="editOfferMode(offer)">Edit</v-btn>
                    <v-btn color="red" @click="deleteOffer(offer._id)">Delete</v-btn>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'

export default {
  components: {
    Breadcrumbs
  },
  data () {
    return {
      editMode: false,
      offer: {
        offerId: null,
        title: null,
        description: null,
        contact: null
      }
    }
  },
  methods: {
    fetchOffers () {
      this.$store.dispatch('fetchOffers')
    },
    addOffer () {
      this.$store.dispatch('addOffer', {
        title: this.offer.title,
        description: this.offer.description,
        contact: this.offer.contact
      }).then(() => {
        this.offer.title = null
        this.offer.description = null
        this.offer.contact = null
      })
    },
    deleteOffer (offerId) {
      this.$store.dispatch('deleteOffer', offerId)
    },
    editOfferMode (offer) {
      this.editMode = true
      this.offer.offerId = offer._id
      this.offer.title = offer.title
      this.offer.description = offer.description
      this.offer.contact = offer.contact
    },
    editOffer () {
      this.$store.dispatch('editOffer', this.offer).then(() => {
        this.editMode = false
        this.offer.offerId = null
        this.offer.title = null
        this.offer.description = null
        this.offer.contact = null
      })
    }
  },
  computed: {
    getOffers () {
      return this.$store.getters.getOffers
    }
  },
  mounted () {
    this.fetchOffers()
  }
}
</script>

<style>

</style>
