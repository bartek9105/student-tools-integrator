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
            <div v-if="editMode">
              <v-btn color="primary" class="mr-4" @click="editOffer">
                Edit offer
              </v-btn>
              <v-btn @click="cancelEdit">
                Cancel
              </v-btn>
            </div>
            <v-btn color="primary" @click="addOffer" v-else>
              Add offer
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <h3 class="mb-8 mt-4">Offers list</h3>
          <p class="text-center display-1 gray--text" v-if="getOffers.length == 0"> No offers added by users </p>
          <v-card v-else v-for="offer in getOffers" :key="offer._id" class="mb-4">
            <v-list-item three-line>
              <v-list-item-content>
                <div>
                  <v-list-item-title class="title mb-4">{{ offer.title }}</v-list-item-title>
                  <span class="caption">{{ offer.createdAt.substr(0, 10) }}</span>
                </div>
                <v-list-item-subtitle class="mb-4 mt-4">
                  <span class="font-weight-bold">Description:</span> {{ offer.description }}
                </v-list-item-subtitle>
                <div>
                  <v-list-item-subtitle>
                  <span class="font-weight-bold">Contact:</span> {{ offer.contact }}
                  </v-list-item-subtitle>
                </div>
                <div class="mt-4">
                  <v-btn color="primary text-white" class="mr-2" @click="editOfferMode(offer)" v-if="offer.creator === getUserId">Edit</v-btn>
                  <v-btn color="red text-white" @click="deleteOffer(offer._id)" v-if="offer.creator === getUserId">Delete</v-btn>
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
  name: 'Offers',
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
    cancelEdit () {
      this.editMode = false
      this.offer.title = null
      this.offer.description = null
      this.offer.contact = null
    },
    async fetchOffers () {
      try {
        await this.$store.dispatch('fetchOffers')
      } catch (error) {
        console.log(error)
      }
    },
    async addOffer () {
      try {
        if (this.offer.title !== null && this.offer.description !== null && this.offer.contact !== null) {
          await this.$store.dispatch('addOffer', {
            title: this.offer.title,
            description: this.offer.description,
            contact: this.offer.contact
          })
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'success',
            text: 'Offer added'
          })
          this.offer.title = null
          this.offer.description = null
          this.offer.contact = null
        } else {
          this.$store.dispatch('showSnackbar', {
            snackbar: true,
            color: 'error',
            text: 'All fields must be filled in'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteOffer (offerId) {
      try {
        await this.$store.dispatch('deleteOffer', offerId)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Offer deleted'
        })
      } catch (error) {
        console.log(error)
      }
    },
    editOfferMode (offer) {
      this.editMode = true
      this.offer.offerId = offer._id
      this.offer.title = offer.title
      this.offer.description = offer.description
      this.offer.contact = offer.contact
    },
    async editOffer () {
      try {
        await this.$store.dispatch('editOffer', this.offer)
        this.$store.dispatch('showSnackbar', {
          snackbar: true,
          color: 'success',
          text: 'Offer edited'
        })
        this.editMode = false
        this.offer.offerId = null
        this.offer.title = null
        this.offer.description = null
        this.offer.contact = null
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    getOffers () {
      return this.$store.getters.getOffers
    },
    getUserId () {
      return this.$store.getters.getUser.userId
    }
  },
  mounted () {
    this.fetchOffers()
  }
}
</script>

<style>

</style>
