const testimonialController=require('../Controllers/testimonial.controller')
module.exports=(app)=>{
  app.post('/thirdProject/api/v1/testimonial/createTestimonial',testimonialController.createTestimonial)
  app.get('/thirdProject/api/v1/testimonial/getTestimonial',testimonialController.getTestimonials)
}