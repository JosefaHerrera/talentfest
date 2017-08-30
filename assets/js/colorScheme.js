$(document).ready(function() {
	
		$(".btn-x-drk").click(function(){
			$(".body").removeClass("light-theme");
			$(".body").addClass("dark-theme");
		});

		$(".btn-x-lgh").click(function(){
			$(".body").removeClass("dark-theme");
			$(".body").addClass("light-theme");
		});
});
