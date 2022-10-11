    <script>
  import { Accordion, AccordionItem } from "carbon-components-svelte";

</script>
<style>
    .bx--accordion__content {
        font-size: xx-large;
    }
    p {
        margin-top: 0.5rem;
        text-align: left;
    }
    h2 {
        margin-top: 3rem;
        font-size: large;
    }
    h1 {
        font-size: x-large;
        padding-bottom: 2rem;
    }
    section {
        padding: 5rem 0;
        text-align: center;
    }
    a {
        text-decoration: underline;
    }
    span {
        text-align: left;
        width: 100%;
    }
    img {
        padding-top: 2rem;
    }
</style>

<section>
    <h1>AIR QUALITY TRENDS IN 122 CITIES FROM NAMP MANUAL MONITORS</h1>
<Accordion align="start">
    <AccordionItem title="What is the NAMP Program?" open={true}>
        <!-- <div> -->
            <!-- <h2>What is the NAMP Program ?</h2> -->
            <p><i class="fa-solid fa-circle-arrow-up"></i>In order to determine status and trends of ambient air quality, ascertain whether prescribed ambient air quality standards are being violated, and to identify which cities have pollution concentration consistently below the national ambient standards, India needs a regulatory monitoring mechanism.</p>
            <p>The National Air Quality Monitoring Programme (NAMP) network consists of 793 operating stations covering 344 cities/towns in 29 states and 6 Union Territories of the country.</p>
            <p>Under NAMP, four pollutants – Sulphur dioxide (So2), nitrogen dioxide (No2), suspended particulate matter (SPM), and respirable suspended particulate matter (RSPM) have been identified as key pollutants for regular monitoring.</p>
            <p>As for manual monitors, air quality is monitored for 24 hours (4-hourly sampling for gaseous pollutants and 8-hourly sampling for particulate matter) with a frequency of twice a week, to have one hundred and four (104) observations in a year. The monitoring is being carried out by state pollution control boards and the National Environmental Engineering Research Institute (NEERI), Nagpur and overseen by pollution control committees, CPCB and now by the Union environment ministry under the National Clean Air Program (NCAP).</p>
        <!-- </div> -->
    </AccordionItem>
    <AccordionItem title="Why NAMP?">
        <!-- <div> -->
            <!-- <h2>Why NAMP ?</h2> -->
            <p>The Central Pollution Control Board had started the National Ambient Air Quality Monitoring (NAAQM) Network during 1984 - 85 at the national level. The program was later renamed as National Air Quality Monitoring Programme (NAMP) wherein ambient air quality monitoring is carried out so as to generate data that meets the objectives of monitoring. </p>
            <p>Air quality monitoring in India was first started with manual monitoring under the NAMP program that included analytical quality control and followed basic monitoring guidelines and calibration methods set by the government. However, there are quite a few draw backs (error ranges, inconsistent power supply, lengthy sampling duration) for this method against real-time or low-cost sensor based air monitoring but it is one of the most expensive and trusted methods used by all state pollution control boards for air monitoring. For this reason, AQ data for all 122 NCAP cities have been collated under one dashboard.</p>
        <!-- </div> -->
    </AccordionItem>
    <AccordionItem title="Manual Monitoring Stations">
        <!-- <div> -->
            <!-- <h2>Manual Monitoring Stations</h2> -->
            <p>Ambient air quality monitoring conducted through the manual method involves analysis of pollutants measured once every six days where data is transferred manually for overall assessment. In most of these manually operated stations, only three criteria pollutants - PM10, Sulphur dioxide (SO2) and nitrogen dioxide (NO2) are measured while some stations record.</p>
            <p>PM 2.5 and lead (Pb) are also measured. The monitoring frequency is twice a week. Such manual networks are not suitable for computing the air quality index (AQI), as availability of monitored data could have a lag of 1-3 days or may not be available for certain periods. These manual station data helps record historical pollution values on a weekly basis that can be calculated and used for data interpretation and ranking of cities or towns for further prioritization of actions on air pollution control.</p>
        <!-- </div> -->
        <img src="./assets/doodle_how_manualair_monitoring_works.jpg"/>
        <p style="text-align: right;">Thanks and Credit for Manual Monitoring Doodle to Urban Emission. <a href="https://urbanemissions.info/blog-pieces/air-monitoring-101/">Know More Here.</a></p>
    </AccordionItem>
    <AccordionItem title="How to use the tables?">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet dictum sit amet justo donec enim. At quis risus sed vulputate odio. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Quisque non tellus orci ac auctor augue mauris. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Nec ultrices dui sapien eget mi proin sed. Tortor aliquam nulla facilisi cras.</p>
        <p>Cursus euismod quis viverra nibh cras. Vitae et leo duis ut diam quam. Id consectetur purus ut faucibus pulvinar elementum. Nibh venenatis cras sed felis eget. Aenean pharetra magna ac placerat vestibulum. Urna molestie at elementum eu facilisis sed odio morbi quis. Egestas maecenas pharetra convallis posuere. Ultricies mi quis hendrerit dolor magna eget. Neque sodales ut etiam sit amet. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Elementum curabitur vitae nunc sed velit dignissim. Semper eget duis at tellus at urna. Cursus in hac habitasse platea dictumst quisque sagittis purus sit. Luctus venenatis lectus magna fringilla urna. Erat pellentesque adipiscing commodo elit at imperdiet dui. Leo integer malesuada nunc vel risus commodo viverra. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu.</p>
    </AccordionItem>
</Accordion>
</section>