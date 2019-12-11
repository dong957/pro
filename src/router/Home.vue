<template>
	<!--为echarts准备一个具备大小的容器dom-->
	<div style="height: 877px;" :style ="note">

		<el-container>
			<el-aside width="700px" style="margin: 70px;">
				<p style="font-size: 30px;margin-right: 100px;">客户营销机会</p>
				<div id="main" style="width: 600px;height: 400px;"></div>
			</el-aside>
			
			<el-container>
				
				<el-main style="margin: 70px;">
					<p style="font-size: 30px;margin-right: 200px;">客户服务</p>
					<div id="service" style="width: 600px;height:400px;"></div>
				</el-main>
			</el-container>
		</el-container>
		



		
	</div>



</template>
<script>
	import echarts from 'echarts'
	export default {
		name: '',
		data() {
			return {
				 note: {
			       backgroundImage: "url(" + require("../../image/b.jpg") + ")",
						backgroundRepeat: "no-repeat",
						backgroundSize: "1700px 3000px",
						marginTop: "0px"
						},
				
				charts: '',
				opinion: ['开发成功', '开发失败'],
				opinionData: [{
						value: this.$store.getters.getSuccessd,
						name: '开发成功'
					},
					{
						value: this.$store.getters.getDefeated,
						name: '开发失败'
					}
				],
				

				seviceOption: ['新创建', '已分配', '已处理', '已归档'],
				serviceOpinionData: [{
						value: this.$store.getters.getServiceCreate,
						name: '新创建'
					},
					{
						value: this.$store.getters.getServiceAllocation,
						name: '已分配'
					},
					{
						value: this.$store.getters.getServiceDispose,
						name: '已处理'
					},
					{
						value: this.$store.getters.getServiceArchive,
						name: '已归档'
					}
				]


			}
		},
		methods: {
			drawPie(id) {
				this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
					tooltip: {
						trigger: 'item',

					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: this.opinion
					},
					series: [{
						name: '营销机会',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'blod'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: this.opinionData
					}]
				})
			},
			//服务
			service(id) {
				this.charts = echarts.init(document.getElementById(id))
				this.charts.setOption({
					tooltip: {
						trigger: 'item',

					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: this.seviceOption
					},
					series: [{
						name: '客户服务',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'blod'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: this.serviceOpinionData
					}]
				})
			}

		},
		//调用
		mounted() {
			this.$nextTick(function() {
				this.drawPie('main');
				this.service('service');
			})
		},
		created() {
			
		}
	}
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
