<script>
  import progressoSVG from "../assets/progresso.svg";
</script>

<img id="loading" src={progressoSVG} alt="Carregando..." />

<style>
  #loading {
    width: 5rem;
    height: 5rem;

    opacity: 0.6;
    animation: 1s loading infinite linear;
  }

  @keyframes loading {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
</style>
