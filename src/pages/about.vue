<template>
  <f7-page name="about">
    <f7-navbar title="关于" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p> {{this.$f7.name}} ------在线咨询,知识付费平台.</p>

      <p> 版本: alpha 1.0</p>
    </f7-block>

    <f7-block>
      <p>软件调试信息:</p>
      <p>{{this.g.info}}</p>
    </f7-block>
  </f7-page>
</template>
